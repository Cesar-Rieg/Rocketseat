const { Router } = require("express");
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const userController = new UserController();


// Get - Requisitar por query params
userRoutes.get("/", (request, response) => {
    const { page, limit } = request.query;
    response.send(`Página: ${page}. Quantidade de registros por página: ${limit}.`);
});

userRoutes.post("/", (request, response) => {
    userController.Create(request, response);
});


module.exports = userRoutes;