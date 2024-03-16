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
exports.getByIdProyect = exports.deleteProyect = exports.updateProyect = exports.postProyects = exports.getProyects = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const Utils_1 = require("../Utils/Utils");
const getPath = () => {
    const rootDir = (0, Utils_1.getRootDir)();
    const pathJson = path_1.default.join(rootDir, "Proyects", "Proyects.json");
    return pathJson;
};
// const path = "./src/Proyects/Proyects.json";
const getProyects = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(getPath())) {
            res.status(404).json({ msg: "Proyects not found" });
            return;
        }
        const convertProyects = yield (0, Utils_1.readAndConvertJson)(getPath());
        res.status(200).json(convertProyects);
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getProyects = getProyects;
const getByIdProyect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const convertProyects = yield (0, Utils_1.readAndConvertJson)(getPath());
        const filterProyects = convertProyects.filter((item) => item.id === id);
        if (filterProyects.length === 0) {
            res.status(404).json({ msg: "Proyect not found" });
            return;
        }
        res.status(200).json(filterProyects);
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getByIdProyect = getByIdProyect;
const postProyects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(getPath())) {
            fs_1.default.writeFileSync(getPath(), JSON.stringify([], null, 2));
        }
        const convertProyects = yield (0, Utils_1.readAndConvertJson)(getPath());
        const id = (0, uuid_1.v4)();
        req.body.id = id;
        req.body.createdAt = (0, Utils_1.generateDate)();
        convertProyects.push(req.body);
        fs_1.default.writeFileSync(getPath(), JSON.stringify(convertProyects, null, 2));
        res.status(201).json({ msg: "Proyect created" });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.postProyects = postProyects;
const updateProyect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const convertProyects = yield (0, Utils_1.readAndConvertJson)(getPath());
        const filterProyects = convertProyects.filter((item) => item.id === id);
        if (filterProyects.length === 0) {
            res.status(404).json({ msg: "Proyect not found" });
            return;
        }
        const updateProyects = convertProyects.map((item) => item.id === id ? Object.assign(Object.assign({}, item), req.body) : item);
        fs_1.default.writeFileSync(getPath(), JSON.stringify(updateProyects, null, 2));
        res.status(200).json({ msg: "Proyect updated" });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateProyect = updateProyect;
const deleteProyect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const convertProyects = yield (0, Utils_1.readAndConvertJson)(getPath());
        const filterOmitProyectId = convertProyects.filter((item) => item.id !== id);
        if (filterOmitProyectId.length === convertProyects.length) {
            res.status(404).json({ msg: "Proyect not found" });
            return;
        }
        fs_1.default.writeFileSync(getPath(), JSON.stringify(filterOmitProyectId, null, 2));
        res.status(200).json({ msg: "Proyect deleted" });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.deleteProyect = deleteProyect;
