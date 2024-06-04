"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerProyects_1 = require("../Controllers/ControllerProyects");
const router = (0, express_1.Router)();
router.get("/", ControllerProyects_1.getProyects);
router.get("/:id", ControllerProyects_1.getByIdProyect);
router.post("/post", ControllerProyects_1.postProyects);
router.put("/update/:id", ControllerProyects_1.updateProyect);
router.delete("/delete/:id", ControllerProyects_1.deleteProyect);
exports.default = router;