"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
// const dbStorage = process.env.DB_STORAGE;
const dbStorage = "./sqlite3/dataBase.sqlite";
const db = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: dbStorage,
    logging: false,
});
exports.default = db;
