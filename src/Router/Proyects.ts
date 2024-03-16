import { Router } from "express";
import {
  deleteProyect,
  getProyects,
  postProyects,
  updateProyect,
  getByIdProyect
} from "../Controllers/ControllerProyects";

const router = Router();

router.get("/", getProyects);
router.get("/:id",getByIdProyect)
router.post("/post", postProyects);
router.put("/update/:id", updateProyect);
router.delete("/delete/:id", deleteProyect);

export default router;
