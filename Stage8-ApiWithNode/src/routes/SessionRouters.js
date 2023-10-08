const { Router } = require("express");

const SessionController = require("../controllers/SessionController");

const sessionController = new SessionController();
const sessionRouters = Router();

sessionRouters.post('/', sessionController.Create);

module.exports = sessionRouters;
