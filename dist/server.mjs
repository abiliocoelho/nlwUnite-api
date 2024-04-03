import {
  registerForEvent
} from "./chunk-LX7JBI5O.mjs";
import {
  errorHandler
} from "./chunk-V2FIT2TP.mjs";
import {
  CheckIn
} from "./chunk-6CBFFWEZ.mjs";
import {
  createEvent
} from "./chunk-GLPZAVDO.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getEventAttendees
} from "./chunk-WUNK7OJD.mjs";
import {
  getEvent
} from "./chunk-DWQ5NVHN.mjs";
import {
  getAttendeeBadge
} from "./chunk-PH7PLZDA.mjs";
import "./chunk-KWNZL4AC.mjs";
import "./chunk-5KVQPZKD.mjs";

// src/server.ts
import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(CheckIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => console.log("server running..."));
