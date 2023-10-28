const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersController = require("../controllers/UsersController");
const UsersValidatorController = require("../controllers/UsersValidatorController");

const usersRoutes = Router();
usersRoutes.use(ensureAuthenticated);

const usersController = new UsersController();
const usersValidatorController = new UsersValidatorController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validator", ensureAuthenticated, usersValidatorController.validate);

module.exports = usersRoutes;