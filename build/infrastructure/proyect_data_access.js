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
const repositorio_base_1 = require("../shared/repositorio_base");
const model_1 = require("../shared/model");
class ProyectRepository extends repositorio_base_1.RepositorioBase {
    constructor() {
        super(model_1.Proyect, "id");
    }
    getProyects() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findAll();
        });
    }
    getProyect(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findById(id);
        });
    }
    createProyect(proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(proyect).then(() => true);
        });
    }
    updateProyect(id, proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, proyect).then(() => true);
        });
    }
    deleteProyect(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delete(id, state).then(() => true);
        });
    }
}
exports.default = ProyectRepository;
