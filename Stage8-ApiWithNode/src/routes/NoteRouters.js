const { Router } = require("express");
const NotesController = require("../controllers/NotesController");
const EnsureAuthenticated = require("../middlewares/EnsureAuthenticated.js");

const noteRoutes = Router();
const notesController = new NotesController();

noteRoutes.get("/", EnsureAuthenticated, notesController.Index);
noteRoutes.get("/:id", EnsureAuthenticated, notesController.Show);
noteRoutes.post("/", EnsureAuthenticated, notesController.Create);
noteRoutes.delete("/:id", EnsureAuthenticated, notesController.Delete);
//noteRoutes.put("/:id", EnsureAuthenticated, notesController.Update);

module.exports = noteRoutes;
