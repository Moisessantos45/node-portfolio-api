"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./infrastructure/api"));
const fastify = (0, fastify_1.default)({ logger: true });
dotenv_1.default.config();
const alloweOrigins = [
    process.env.HOST_BACKEND_URL,
    process.env.HOST_BACKEND_URL_MODIFY,
];
fastify.register(cors_1.default, {
    origin: function (origin, callback) {
        if (alloweOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
});
const PORT = process.env.PORT || 4000;
fastify.register(api_1.default, { prefix: "/Api/1.0" });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({
            port: 4000,
        });
        fastify.log.info(`Server is running on port ${PORT}`);
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
});
start();
