// import express from "express";
const express = require("express");
const router = express.Router();

// import {login,auth} from "../controller/auth.js";
const { login, auth } = require("../controller/auth");

router.post("/", login);

router.get("/", auth);

// export default router;
module.exports = router;
