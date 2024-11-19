import express from "express";
import {
  addTransaksi,
  updateTransaksi,
  deleteTransaksi,
  getTransaksiById,
  getAllTransaksi,
} from "../controllers/transaksi.controller.js";
const app = express();
app.use(express.json());

app.get("/", getAllTransaksi);

app.get("/:id", getTransaksiById);

app.post("/", addTransaksi);

app.put("/:id", updateTransaksi);  

app.delete("/:id", deleteTransaksi);

export default app;
