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
exports.RepositorioBase = void 0;
class RepositorioBase {
    constructor(model, defaultKey = "id") {
        this.model = model;
        this.defaultKey = defaultKey;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByPk(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield this.model.update(data, {
                where: { id },
            });
            return affectedCount;
        });
    }
    updateStatus(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield this.model.update({ status: state }, { where: { id } });
            return affectedCount;
        });
    }
    updateAtribute(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield this.model.update({ counter_likes: value }, { where: { id } });
            return affectedCount;
        });
    }
    delete(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield this.model.update({ status: state }, { where: { id } });
            // const affectedCount = await this.model.destroy({ where: { id } as any });
            return affectedCount;
        });
    }
}
exports.RepositorioBase = RepositorioBase;
