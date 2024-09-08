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
exports.consultProyectsView = exports.createProyectsView = void 0;
const dbConnection_1 = __importDefault(require("./dbConnection"));
const createProyectsView = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createViewQuery = `
    CREATE VIEW IF NOT EXISTS v_Proyects AS
    SELECT
      id,
      title,
      typeProyect,
      description,
      tecnologies,
      caracteristicas,
      image,
      imagenesProyect,
      link,
      link_gitHub,
      createdAt,
      status
    FROM
      proyects;
  `;
        yield dbConnection_1.default.query(createViewQuery);
        console.log("View created successfully");
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProyectsView = createProyectsView;
const consultProyectsView = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultViewQuery = `
        SELECT * FROM v_Proyects;
    `;
        const result = yield dbConnection_1.default.query(consultViewQuery);
        const data = result[0];
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.consultProyectsView = consultProyectsView;
