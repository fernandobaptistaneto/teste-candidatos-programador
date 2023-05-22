import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import PostController from "./controllers/PostController";
import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/userCreate", UserController.createUser);
routes.post("/login", AuthController.userLogin);
routes.post("/userCreatePost", authMiddleware, PostController.criarPost)
export default routes;
