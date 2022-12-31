import express from "express";
const router = express.Router();

import {login,auth} from "../controller/auth.js";

router.post("/", login);

router.get("/", auth);

export default router;
