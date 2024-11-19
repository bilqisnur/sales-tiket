import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import mejaRoute from "./routes/meja.route.js";
import menuRoute from "./routes/menu.route.js";
import transaksiRoute from "./routes/transaksi.route.js";

const app = express();

dotenv.config;
app.use(express.json());
app.use("/user", userRoute);
app.use("/meja", mejaRoute);
app.use("/menu", menuRoute);
app.use("/transaksi",transaksiRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("server run on port " + process.env.APP_PORT);
});
