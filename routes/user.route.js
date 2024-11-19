import express from "express";
import {
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from "../controllers/user.controller.js";

import { authenticate,authorize } from "../controllers/auth_controller.js"
import {IsAdmin, IsManager, IsKasir} from "../middleware/role_validation.js"
const app = express();
app.use(express.json());

app.get("/", getAllUsers);

app.get("/:id", getUserById);

app.post("/", authorize, [IsAdmin], addUser);

app.put("/:id", authorize, IsAdmin, updateUser);  

app.delete("/:id", authorize, IsAdmin, deleteUser);

app.post("/login", authenticate)

export default app;
