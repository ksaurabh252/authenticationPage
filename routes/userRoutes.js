import express, { Router } from "express";
import { login, signup } from "../controller/userController.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/register", signup);
router.post("/login", login);
export default router;
