import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
// import { login, signup } from "./controller/userController.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const DATABASE_URL = process.env.DATABASE_URL;
const port = process.env.PORT;

dbConnect(DATABASE_URL);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/signup", (req, res) => {
  res.render("signup")
});
app.get("/login", (req, res) => {
  res.render("login")
});
app.use("/user", userRoutes);
app.use("/", userRoutes);
app.listen(port, () => {
  console.log(`Connnected to ${port}`);
});
