const { Router } = require("express");
const UserController = require("../controllers/UsersController");
const EnsureAuthenticated = require("../middlewares/EnsureAuthenticated.js");
const multer = require("multer");
const UploadConfig = require("../configs/FileUpload.js");

const userRoutes = Router();
const userController = new UserController();

const upload = multer(UploadConfig.MULTER);

userRoutes.post("/", userController.Create);
userRoutes.put("/", EnsureAuthenticated, userController.Update);
userRoutes.patch("/avatar", EnsureAuthenticated, upload.single("avatar"), (request, response) => {
    console.log(request.file.filename)
    return response.json({Message: "avatar anexado"});
});

module.exports = userRoutes;
