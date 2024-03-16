import { Router } from "express";

const router = Router();

router.get("/login")
router.post("/register")
router.put("/update/:id")
router.delete("/delete/:id")
router.post("/logout")

export default router;