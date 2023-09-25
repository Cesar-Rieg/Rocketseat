const { Router } = require("express");
const userRouter = require("./UserRouters");
const noteRouter = require("./NoteRouters");

const routes = Router();
routes.use("/users", userRouter);
routes.use("/notes", noteRouter);

module.exports = routes;
