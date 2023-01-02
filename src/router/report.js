// import upload from "../middleware/upload.js";
// import express from "express";
const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

// import {
//   getReports,
//   getCheckedReports,
//   getUncheckedReports,
//   createReport,
//   checkReport,
// } from "../controller/report.js";

const {
  getReport,
  getReports,
  getCheckedReports,
  getUncheckedReports,
  createReport,
  checkReport,
} = require("../controller/report");

router.get("/all", getReports);

router.get("/checked", getCheckedReports);

router.get("/unchecked", getUncheckedReports);

router.post("/", upload.array("images"), createReport);

router.post("/check/:id", checkReport);

// export default router;
module.exports = router;
