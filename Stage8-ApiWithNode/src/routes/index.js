const { Router } = require("express");
const userRouter = require("./UserRouters");

const routes = Router();
routes.use("/users", userRouter);

module.exports = routes;