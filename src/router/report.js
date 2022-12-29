import upload from "../middleware/upload.js";
import express from "express";

const router = express.Router();

import {getReports,getUncheckedReports,createReport,checkReport, uploadImg} from "../controller/report.js";

router.get("/all",getReports )

router.get("/unchecked",getUncheckedReports )

router.post("/create",createReport )

router.post("/check/:id",checkReport )

router.post("/img", upload.single("file"), uploadImg)

export default router;
