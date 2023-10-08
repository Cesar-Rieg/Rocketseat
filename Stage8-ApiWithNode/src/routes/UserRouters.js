const { Router } = require("express");
const UserController = require("../controllers/UsersController");

const userRoutes = Router();
const userController = new UserController();

const EnsureAuthenticated = require("../middlewares/EnsureAuthenticated.js");

userRoutes.post("/", userController.Create);
userRoutes.put("/", EnsureAuthenticated, userController.Update);

module.exports = userRoutes;
