import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { CheckIn } from './routes/check-in'
import { createEvent } from './routes/create-event'
import { getEventAttendees } from './routes/get-event-attendees'
import { getEvent } from './routes/get-events'
import { getAttendeeBadge } from './routes/get_attendee-badge'
import { registerForEvent } from './routes/register-for-events'
const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(CheckIn)
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => console.log('server running...'))
