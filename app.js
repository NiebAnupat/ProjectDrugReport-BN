// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { fileURLToPath } = require("url");
require("dotenv").config();

const app = express();
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

global.__basedir = __dirname;

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reportRouter = require("./src/router/report");
const authRouter = require("./src/router/auth");
app.use("/report", reportRouter);
app.use("/auth", authRouter);

// comment out the following line if you want to use the server.js file
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
