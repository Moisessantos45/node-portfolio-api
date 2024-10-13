import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import rateLimit from "@fastify/rate-limit";
import ProyectRepository from "./proyect_data_access";
import ProyectService from "../application/proyect_use_case";
import ProyectController from "./proyect_management";
import db from "../shared/dbConnection";
import {
  GetProyectRequest,
  GetProyectRequestBody,
  GetProyectRequestBodyAndRequest,
  UpdateCounterLikesRequestBody,
} from "./types";

const getProyectService = async (): Promise<ProyectService> => {
  await db.sync();
  const proyectRepository = new ProyectRepository();
  const proyectService = new ProyectService(proyectRepository);
  return proyectService;
};

const api = async (fastify: FastifyInstance) => {
  await fastify.register(rateLimit, {
    global: false,
  });

  const proyectService = await getProyectService();
  const proyects = new ProyectController(proyectService);

  fastify.get(
    "/Proyects",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: 10 * 1000,
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return proyects.getProyects(request, reply);
    }
  );

  fastify.get(
    "/Proyects/:id",
    {
      config: {
        rateLimit: {
          max: 30,
          timeWindow: 10 * 1000,
        },
      },
    },
    async (request: FastifyRequest<GetProyectRequest>, reply: FastifyReply) => {
      return proyects.getProyect(request, reply);
    }
  );

  fastify.post(
    "/Proyects/post",
    async (
      request: FastifyRequest<GetProyectRequestBody>,
      reply: FastifyReply
    ) => {
      return proyects.createProyect(request, reply);
    }
  );

  fastify.put(
    "/Proyects/update/:id",
    async (
      request: FastifyRequest<GetProyectRequestBodyAndRequest>,
      reply: FastifyReply
    ) => {
      return proyects.updateProyect(request, reply);
    }
  );

  fastify.patch(
    "/Proyects/update/state/:id",
    async (request: FastifyRequest<GetProyectRequest>, reply: FastifyReply) => {
      return proyects.apiChangeStateProyect(request, reply);
    }
  );

  fastify.patch(
    "/Proyects/update/counter-likes/:id",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: 15 * 1000,
        },
      },
    },
    async (
      request: FastifyRequest<UpdateCounterLikesRequestBody>,
      reply: FastifyReply
    ) => {
      return proyects.updateLikesCount(request, reply);
    }
  );

  fastify.delete(
    "/Proyects/delete/:id",
    async (request: FastifyRequest<GetProyectRequest>, reply: FastifyReply) => {
      return proyects.deleteProyect(request, reply);
    }
  );

  fastify.setErrorHandler(function (error, _request, reply) {
    if (error.statusCode === 429) {
      reply.code(429).send({
        statusCode: 429,
        error: "Too Many Requests",
        message: "Rate limit exceeded, retry in 10 seconds",
      });
    } else {
      reply.send(error);
    }
  });
};

export default api;
