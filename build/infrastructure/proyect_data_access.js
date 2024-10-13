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
const repositorio_base_1 = require("../shared/repositorio_base");
const model_1 = require("../shared/model");
const dbConnection_1 = __importDefault(require("../shared/dbConnection"));
class ProyectRepository extends repositorio_base_1.RepositorioBase {
    constructor() {
        super(model_1.Proyect, "id");
    }
    getProyects() {
        return __awaiter(this, void 0, void 0, function* () {
            const consultViewQuery = `
    SELECT * FROM v_Proyects;
  `;
            const [results] = yield dbConnection_1.default.query(consultViewQuery);
            return results;
        });
    }
    getProyect(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const consultViewQuery = `
      SELECT * FROM v_Proyects WHERE id = :id;
    `;
            const [results] = yield dbConnection_1.default.query(consultViewQuery, {
                replacements: { id },
            });
            return results[0];
        });
    }
    // async createProyect(proyect: Partial<Proyect>): Promise<boolean> {
    //   return this.create(proyect).then(() => true);
    // }
    createProyect(proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create(proyect).then(() => true);
        });
    }
    updateProyect(id, proyect) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.update(id, proyect);
            return response > 0;
        });
    }
    updateStateProyect(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.updateStatus(id, state);
            return response > 0;
        });
    }
    updateLikesCount(id, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.updateAtribute(id, count);
            return response > 0;
        });
    }
    deleteProyect(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.delete(id, state);
            return response > 0;
        });
    }
}
exports.default = ProyectRepository;
