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
exports.getRootDir = exports.readAndConvertJson = exports.generateDate = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generateDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
exports.generateDate = generateDate;
const readAndConvertJson = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(path)) {
        return [];
    }
    const data = fs_1.default.readFileSync(path, "utf-8");
    return JSON.parse(data);
});
exports.readAndConvertJson = readAndConvertJson;
const getRootDir = () => {
    const rootDirDev = path_1.default.resolve(__dirname, "..", ".."); // Directorio raíz en desarrollo
    const rootDirProd = path_1.default.resolve(__dirname, "..", "..", "src"); // Directorio raíz en producción
    return fs_1.default.existsSync(path_1.default.join(__dirname, "..", "..", "build"))
        ? rootDirProd
        : rootDirDev;
};
exports.getRootDir = getRootDir;
