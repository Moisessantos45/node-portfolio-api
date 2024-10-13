import ProyectService from "../application/proyect_use_case";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GetProyectRequest,
  GetProyectRequestBody,
  GetProyectRequestBodyAndRequest,
  UpdateCounterLikesRequestBody,
} from "./types";

class ProyectController {
  private proyectService: ProyectService;

  constructor(proyectService: ProyectService) {
    this.proyectService = proyectService;
  }

  async getProyects(_request: FastifyRequest, reply: FastifyReply) {
    const result = await this.proyectService.getProyects();
    if (!result.success) {
      return reply.code(404).send(result.message);
    }
    reply.code(200).send(result.data);
  }

  async getProyect(
    request: FastifyRequest<GetProyectRequest>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const result = await this.proyectService.getProyect(id);
    if (!result.success) {
      return reply.code(404).send(result.message);
    }
    reply.code(200).send(result.data);
  }

  async createProyect(
    request: FastifyRequest<GetProyectRequestBody>,
    reply: FastifyReply
  ) {
    const proyect = request.body;
    const result = await this.proyectService.createProyect(proyect);
    if (!result.success) {
      return reply.code(400).send(result.message);
    }
    reply.code(201).send(result);
  }

  async updateProyect(
    request: FastifyRequest<GetProyectRequestBodyAndRequest>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const proyect = request.body;
    const result = await this.proyectService.updateProyect(id, proyect);
    if (!result.success) {
      return reply.code(400).send(result.message);
    }
    reply.code(200).send(result);
  }

  async updateLikesCount(
    request: FastifyRequest<UpdateCounterLikesRequestBody>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const count = request.query.counter_likes;
    const result = await this.proyectService.updateAtribute(id, count);
    if (!result.success) {
      return reply.code(400).send(result.message);
    }
    reply.code(200).send(result);
  }

  async apiChangeStateProyect(
    request: FastifyRequest<GetProyectRequest>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const status = request.query.status;
    const result = await this.proyectService.changeStateProyect(id, status);

    if (!result.success) {
      return reply.code(400).send(result.message);
    }
    reply.code(200).send(result);
  }

  async deleteProyect(
    request: FastifyRequest<GetProyectRequest>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const status = request.query.status;
    const result = await this.proyectService.deleteProyect(id, status);
    if (!result.success) {
      return reply.code(400).send(result.message);
    }
    reply.code(200).send(result);
  }
}

export default ProyectController;
