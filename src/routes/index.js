const { Router } = require("express");
const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");

const routes = Router();
routes.use('/users', userRouter)
routes.use('/auth', authRouter)

module.exports = routes;