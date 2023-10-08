const { Router } = require("express");
const UserController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const EnsureAuthenticated = require("../middlewares/EnsureAuthenticated.js");
const multer = require("multer");
const UploadConfig = require("../configs/FileUpload.js");

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(UploadConfig.MULTER);

userRoutes.post("/", userController.Create);
userRoutes.put("/", EnsureAuthenticated, userController.Update);
userRoutes.patch("/avatar", EnsureAuthenticated, upload.single("avatar"), userAvatarController.Update);

module.exports = userRoutes;
