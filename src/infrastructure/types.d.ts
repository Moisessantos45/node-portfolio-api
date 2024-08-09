import { RouteGenericInterface } from "fastify";
import { TypeProyectsCreate } from "../domains/proyect_entity";

interface GetProyectRequest extends RouteGenericInterface {
  Params: { id: string };
  Querystring: { status: string };
}

interface GetProyectRequestBody extends RouteGenericInterface {
  Body: TypeProyectsCreate;
}

interface GetProyectRequestBodyAndRequest extends RouteGenericInterface {
  Body: TypeProyectsCreate;
  Params: { id: string };
}

export {
  GetProyectRequest,
  GetProyectRequestBody,
  GetProyectRequestBodyAndRequest,
};
