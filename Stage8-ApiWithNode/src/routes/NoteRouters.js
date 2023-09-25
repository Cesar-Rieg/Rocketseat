const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const noteRoutes = Router();
const notesController = new NotesController();

function middlewareApplication(request, response, next){
    console.log("Você passou pelo Middlleware do NoteRouters.");

    if (!request.body.isAdmin){
        return response.status(401).json({ message: "User unauthorized." });
    }

    next();
}

noteRoutes.get("/", middlewareApplication, notesController.Index);
noteRoutes.get("/:id", middlewareApplication, notesController.Show);
noteRoutes.post("/:user_id", middlewareApplication, notesController.Create);
noteRoutes.delete("/:id", middlewareApplication, notesController.Delete);
//enoteRoutes.put("/:id", middlewareApplication, notesController.Update);

module.exports = noteRoutes;
