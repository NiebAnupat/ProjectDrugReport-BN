import upload from "../middleware/upload.js";
import express from "express";

const router = express.Router();

import {
  getReports,
  getUncheckedReports,
  createReport,
  checkReport,
} from "../controller/report.js";

router.get("/all", getReports);

router.get("/unchecked", getUncheckedReports);

router.post("/", upload.array("images"), createReport);

router.post("/check/:id", checkReport);

export default router;
