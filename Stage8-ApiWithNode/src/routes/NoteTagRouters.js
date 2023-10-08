const { Router } = require("express");
const NotesTagsController = require("../controllers/NotesTagsController");
const EnsureAuthenticated = require("../middlewares/EnsureAuthenticated.js");

const noteTagsRoutes = Router();
const notesTagsController = new NotesTagsController();


noteTagsRoutes.get("/", EnsureAuthenticated, notesTagsController.Index);

module.exports = noteTagsRoutes;
