import {
  BadRequest
} from "./chunk-KWNZL4AC.mjs";
import {
  prisma
} from "./chunk-5KVQPZKD.mjs";

// src/routes/get_attendee-badge.ts
import { z } from "zod";
async function getAttendeeBadge(app) {
  app.withTypeProvider().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        summary: "Get an attendee badge",
        tags: ["attendees"],
        params: z.object({
          attendeeId: z.coerce.number()
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url()
            })
          })
        }
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params;
      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
      });
      if (!attendee) {
        throw new BadRequest("Attendee not found");
      }
      const baseUrl = `${request.protocol}://${request.hostname}`;
      const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseUrl);
      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInURL: checkInURL.toString()
        }
      });
    }
  );
}

export {
  getAttendeeBadge
};
