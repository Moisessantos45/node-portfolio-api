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
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const proyect_data_access_1 = __importDefault(require("./proyect_data_access"));
const proyect_use_case_1 = __importDefault(require("../application/proyect_use_case"));
const proyect_management_1 = __importDefault(require("./proyect_management"));
const dbConnection_1 = __importDefault(require("../shared/dbConnection"));
const getProyectService = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnection_1.default.sync();
    const proyectRepository = new proyect_data_access_1.default();
    const proyectService = new proyect_use_case_1.default(proyectRepository);
    return proyectService;
});
const api = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    yield fastify.register(rate_limit_1.default, {
        global: false,
    });
    const proyectService = yield getProyectService();
    const proyects = new proyect_management_1.default(proyectService);
    fastify.get("/Proyects", {
        config: {
            rateLimit: {
                max: 10,
                timeWindow: 10 * 1000,
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.getProyects(request, reply);
    }));
    fastify.get("/Proyects/:id", {
        config: {
            rateLimit: {
                max: 30,
                timeWindow: 10 * 1000,
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.getProyect(request, reply);
    }));
    fastify.post("/Proyects/post", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.createProyect(request, reply);
    }));
    fastify.put("/Proyects/update/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.updateProyect(request, reply);
    }));
    fastify.patch("/Proyects/update/state/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.apiChangeStateProyect(request, reply);
    }));
    fastify.patch("/Proyects/update/counter-likes/:id", {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: 15 * 1000,
            },
        },
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.updateLikesCount(request, reply);
    }));
    fastify.delete("/Proyects/delete/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return proyects.deleteProyect(request, reply);
    }));
    fastify.setErrorHandler(function (error, _request, reply) {
        if (error.statusCode === 429) {
            reply.code(429).send({
                statusCode: 429,
                error: "Too Many Requests",
                message: "Rate limit exceeded, retry in 10 seconds",
            });
        }
        else {
            reply.send(error);
        }
    });
});
exports.default = api;
