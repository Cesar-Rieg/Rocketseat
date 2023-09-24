const { Router } = require("express");
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const userController = new UserController();



function middlewareApplication(request, response, next){
    console.log("Você passou pelo Middlleware");

    if (!request.body.isAdmin){
        return response.status(401).json({ message: "User unauthorized." });
    }

    next();
}







// Get - Requisitar por query params
userRoutes.get("/", (request, response) => {
    const { page, limit } = request.query;
    response.send(`Página: ${page}. Quantidade de registros por página: ${limit}.`);
});

userRoutes.post("/", middlewareApplication, userController.Create);
userRoutes.put("/:id", middlewareApplication, userController.Update);

module.exports = userRoutes;
