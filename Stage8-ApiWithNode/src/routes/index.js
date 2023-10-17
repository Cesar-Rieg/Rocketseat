const { Router } = require("express");
const sessionsRouter = require("./SessionRouters");
const usersRouter = require("./UserRouters");
const notesRouter = require("./NoteRouters");
const notesTagsRouter = require("./NoteTagRouters");

const routes = Router();
routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/notes-tags", notesTagsRouter);

module.exports = routes;
