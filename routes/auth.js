// handles the authentication routes

const express = require("express");
const { authLogin } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", authLogin);

module.exports = authRouter;
