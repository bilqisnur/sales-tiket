import express from "express";
import {
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
  getAllMenu,
} from "../controllers/menu.controller.js";
import { authorize } from "../controllers/auth_controller.js";
import { IsAdmin, IsKasir , IsManager} from "../middleware/role_validation.js";
const app = express();
app.use(express.json());

app.get("/", authorize, IsAdmin ,IsManager, IsKasir,  getAllMenu);

app.get("/:id", getMenuById);

app.post("/", addMenu);

app.put("/:id", updateMenu);  

app.delete("/:id", deleteMenu);

export default app;
