const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router
    .route("/")
    .post(AuthController.generateJWT);

module.exports = router;