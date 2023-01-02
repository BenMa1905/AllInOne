const express = require("express");
const upload = require("../lib/Storage");
const api = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/credentials");

api.post("/user", upload.single("image"), userController.createUser);
api.get("/users", userController.getUsers);
api.get("/user/search/:id", userController.getUser);
api.get("/user/searchName/:id", userController.getNameUser);
api.get("/user/searchrut/:rut", userController.getRutUser);
api.put("/user/update/:id", userController.updateUser);
api.delete("/user/delete/:id", userController.deleteUser);
api.post("/user/login", userController.login);
api.get("/user/logout", userController.logout);
api.get("/user/verifyToken", auth.auth, userController.verifyToken);
api.post(
  "/api/user/updateImg/:id",
  upload.single("image"),
  userController.updateImgUser
);

module.exports = api;
