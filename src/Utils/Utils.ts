import fs from "fs";
import path from "path";
import { TypeProyects } from "../Types/types";

const generateDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const readAndConvertJson = async (path: string): Promise<TypeProyects[]> => {
  if (!fs.existsSync(path)) {
    return [];
  }
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data);
};

const getRootDir = () => {
  const rootDirDev = path.resolve(__dirname, "..", ".."); // Directorio raíz en desarrollo
  const rootDirProd = path.resolve(__dirname, "..", "..", "src"); // Directorio raíz en producción
  return fs.existsSync(path.join(__dirname, "..", "..", "build"))
    ? rootDirProd
    : rootDirDev;
};

export { generateDate, readAndConvertJson,getRootDir };
