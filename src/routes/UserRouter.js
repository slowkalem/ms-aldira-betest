const express = require("express");
const router = express.Router();

const { JwtFilter } = require("../middleware/RequestFilter");

const UserController = require("../controllers/UserController");

router.all("/*", JwtFilter);

router
    .route("/")
    .post(UserController.createUser)

router
    .route("/")
    .get(UserController.getAllUsers)

router
    .route("/getById")
    .get(UserController.getUserById)

router
    .route("/getByIdentityNumber")
    .get(UserController.getUserByIdentityNumber)

router
    .route("/getByAccountNumber")
    .get(UserController.getUserByAccountNumber)

router
    .route("/")
    .put(UserController.updateUser);

router
    .route("/")
    .delete(UserController.deleteUser);

module.exports = router;