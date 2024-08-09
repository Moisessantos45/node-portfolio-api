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
const service_1 = require("../domains/service");
class ProyectService {
    constructor(proyectRepository) {
        this.proyectRepository = proyectRepository;
    }
    getProyects() {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield this.proyectRepository.getProyects();
            if (!resul.length) {
                return { success: false, message: "No proyects found" };
            }
            const newResul = resul.map(service_1.fromToJsonMapResponse);
            return { success: true, data: newResul };
        });
    }
    getProyect(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield this.proyectRepository.getProyect(id);
            if (!resul) {
                return { success: false, message: "Proyect not found" };
            }
            const newResul = (0, service_1.fromToJsonMapResponse)(resul);
            return { success: true, data: newResul };
        });
    }
    createProyect(proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProyect = (0, service_1.fromToJsonMap)(proyect);
            const resul = yield this.proyectRepository.createProyect(newProyect);
            if (!resul) {
                return { success: false, message: "Proyect not created" };
            }
            return { success: true, message: "Proyect created" };
        });
    }
    updateProyect(id, proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProyect = (0, service_1.fromToJsonMapUpdate)(proyect);
            const resul = yield this.proyectRepository.updateProyect(id, newProyect);
            if (!resul) {
                return { success: false, message: "Proyect not updated" };
            }
            return { success: true };
        });
    }
    deleteProyect(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const resul = yield this.proyectRepository.deleteProyect(id, state);
            if (!resul) {
                return { success: false, message: "Proyect not deleted" };
            }
            return { success: true };
        });
    }
}
exports.default = ProyectService;
