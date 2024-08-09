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
Object.defineProperty(exports, "__esModule", { value: true });
class ProyectController {
    constructor(proyectService) {
        this.proyectService = proyectService;
    }
    getProyects(_request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.proyectService.getProyects();
            if (!result.success) {
                return reply.code(404).send(result.message);
            }
            reply.code(200).send(result.data);
        });
    }
    getProyect(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const result = yield this.proyectService.getProyect(id);
            if (!result.success) {
                return reply.code(404).send(result.message);
            }
            reply.code(200).send(result.data);
        });
    }
    createProyect(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const proyect = request.body;
            const result = yield this.proyectService.createProyect(proyect);
            if (!result.success) {
                return reply.code(400).send(result.message);
            }
            reply.code(201).send(result);
        });
    }
    updateProyect(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const proyect = request.body;
            const result = yield this.proyectService.updateProyect(id, proyect);
            if (!result.success) {
                return reply.code(400).send(result.message);
            }
            reply.code(200).send(result);
        });
    }
    deleteProyect(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const status = request.query.status;
            const result = yield this.proyectService.deleteProyect(id, status);
            if (!result.success) {
                return reply.code(400).send(result.message);
            }
            reply.code(200).send(result);
        });
    }
}
exports.default = ProyectController;
