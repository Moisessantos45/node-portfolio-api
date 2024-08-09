import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import api from "./infrastructure/api";

const fastify = Fastify({ logger: true });
dotenv.config();

const alloweOrigins = [
  process.env.HOST_BACKEND_URL,
  process.env.HOST_BACKEND_URL_MODIFY,
];

fastify.register(cors, {
  origin: function (origin: any, callback: Function) {
    if (alloweOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

const PORT = process.env.PORT || 4000;

fastify.register(api, { prefix: "/Api/1.0" });
const start = async () => {
  try {
    await fastify.listen({
      port: 4000,
    });
    fastify.log.info(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
