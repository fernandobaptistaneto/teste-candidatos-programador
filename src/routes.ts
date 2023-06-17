import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import PostController from "./controllers/PostController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/userCreate", UserController.createUser);
routes.get("/userList", UserController.listarUsers);
routes.put("/userUpdate", authMiddleware, UserController.updateUser);
routes.put("/userDelete", authMiddleware, UserController.deleteUser);
routes.post("/login", AuthController.userLogin);

routes.post("/userCreatePost", authMiddleware, PostController.criarPost);
routes.get("/listarPost", authMiddleware, PostController.listarPost);
routes.put("/atualizarPost", authMiddleware, PostController.atualizarPost);
routes.delete("/postDelete", authMiddleware, PostController.deletePost);

export default routes;
