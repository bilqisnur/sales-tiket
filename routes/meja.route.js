import express from "express";
import {
  addMeja,
  updateMeja,
  deleteMeja,
  getMejaById,
  getAllMeja,
} from "../controllers/meja.controller.js";
const app = express();
app.use(express.json());

app.get("/", getAllMeja);

app.get("/:id", getMejaById);

app.post("/", addMeja);

app.put("/:id", updateMeja);

app.delete("/:id", deleteMeja);

export default app;
