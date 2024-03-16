import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { TypeProyects } from "../Types/types";
import { v4 as uuidv4 } from "uuid";
import { generateDate, readAndConvertJson, getRootDir } from "../Utils/Utils";

const getPath = () => {
  const rootDir = getRootDir();
  const pathJson = path.join(rootDir, "Proyects", "Proyects.json");
  return pathJson;
};

// const path = "./src/Proyects/Proyects.json";

const getProyects = async (_req: Request, res: Response) => {
  try {
    if (!fs.existsSync(getPath())) {
      res.status(404).json({ msg: "Proyects not found" });
      return;
    }
    const convertProyects = await readAndConvertJson(getPath());
    res.status(200).json(convertProyects);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getByIdProyect = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const convertProyects: TypeProyects[] = await readAndConvertJson(getPath());
    const filterProyects = convertProyects.filter((item) => item.id === id);
    if (filterProyects.length === 0) {
      res.status(404).json({ msg: "Proyect not found" });
      return;
    }
    res.status(200).json(filterProyects);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const postProyects = async (req: Request, res: Response) => {
  try {
    if (!fs.existsSync(getPath())) {
      fs.writeFileSync(getPath(), JSON.stringify([], null, 2));
    }
    const convertProyects: TypeProyects[] = await readAndConvertJson(getPath());
    const id = uuidv4();
    req.body.id = id;
    req.body.createdAt = generateDate();
    convertProyects.push(req.body);
    fs.writeFileSync(getPath(), JSON.stringify(convertProyects, null, 2));
    res.status(201).json({ msg: "Proyect created" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateProyect = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const convertProyects: TypeProyects[] = await readAndConvertJson(getPath());
    const filterProyects = convertProyects.filter((item) => item.id === id);
    if (filterProyects.length === 0) {
      res.status(404).json({ msg: "Proyect not found" });
      return;
    }
    const updateProyects = convertProyects.map((item) =>
      item.id === id ? { ...item, ...req.body } : item
    );
    fs.writeFileSync(getPath(), JSON.stringify(updateProyects, null, 2));
    res.status(200).json({ msg: "Proyect updated" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteProyect = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const convertProyects: TypeProyects[] = await readAndConvertJson(getPath());
    const filterOmitProyectId = convertProyects.filter(
      (item) => item.id !== id
    );
    if (filterOmitProyectId.length === convertProyects.length) {
      res.status(404).json({ msg: "Proyect not found" });
      return;
    }
    fs.writeFileSync(getPath(), JSON.stringify(filterOmitProyectId, null, 2));
    res.status(200).json({ msg: "Proyect deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export {
  getProyects,
  postProyects,
  updateProyect,
  deleteProyect,
  getByIdProyect,
};
