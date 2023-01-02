import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = __dirname;

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import reportRouter from "./src/router/report.js";
import authRouter from "./src/router/auth.js";
app.use("/report", reportRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
