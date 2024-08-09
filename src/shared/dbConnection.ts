import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();

// const dbStorage = process.env.DB_STORAGE;
const dbStorage = "./sqlite3/dataBase.sqlite";

const db = new Sequelize({
  dialect: "sqlite",
  storage: dbStorage!,
  logging: false,
});

export default db;
