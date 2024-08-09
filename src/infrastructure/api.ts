import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ProyectRepository from "./proyect_data_access";
import ProyectService from "../application/proyect_use_case";
import ProyectController from "./proyect_management";
import db from "../shared/dbConnection";
import {
  GetProyectRequest,
  GetProyectRequestBody,
  GetProyectRequestBodyAndRequest,
} from "./types";

const getProyectService = async (): Promise<ProyectService> => {
  await db.sync();
  const proyectRepository = new ProyectRepository();
  const proyectService = new ProyectService(proyectRepository);
  return proyectService;
};

const api = async (fastify: FastifyInstance) => {
  fastify.get(
    "/Proyects",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const proyectService = await getProyectService();
      const proyects = new ProyectController(proyectService);
      return proyects.getProyects(request, reply);
    }
  );

  fastify.get(
    "/Proyects/:id",
    async (request: FastifyRequest<GetProyectRequest>, reply: FastifyReply) => {
      const proyectService = await getProyectService();
      const proyects = new ProyectController(proyectService);
      return proyects.getProyect(request, reply);
    }
  );

  fastify.post(
    "/Proyects/post",
    async (
      request: FastifyRequest<GetProyectRequestBody>,
      reply: FastifyReply
    ) => {
      const proyectService = await getProyectService();
      const proyects = new ProyectController(proyectService);
      return proyects.createProyect(request, reply);
    }
  );
  fastify.put(
    "/Proyects/update/:id",
    async (
      request: FastifyRequest<GetProyectRequestBodyAndRequest>,
      reply: FastifyReply
    ) => {
      const proyectService = await getProyectService();
      const proyects = new ProyectController(proyectService);
      return proyects.updateProyect(request, reply);
    }
  );

  fastify.delete(
    "/Proyects/delete/:id",
    async (request: FastifyRequest<GetProyectRequest>, reply: FastifyReply) => {
      const proyectService = await getProyectService();
      const proyects = new ProyectController(proyectService);
      return proyects.deleteProyect(request, reply);
    }
  );
};

export default api;
