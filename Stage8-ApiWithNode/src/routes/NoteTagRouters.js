const { Router } = require("express");
const NotesTagsController = require("../controllers/NotesTagsController");

const noteTagsRoutes = Router();
const notesTagsController = new NotesTagsController();


noteTagsRoutes.get("/:user_id", notesTagsController.Index);

module.exports = noteTagsRoutes;
