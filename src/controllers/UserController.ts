import { UserRepository } from "../repositories/UserRepository";
import { Response, Request } from "express";

export class UserController {

  async createUser(req: Request, res: Response) {
    const { username, password, name } = req.body;

    const userExists = await UserRepository.findOne({ where: { username } });

    if (userExists) {
      return res.status(400).send({ message: "Usuário já existe!" });
    }

    try {
      const usuario = UserRepository.create({ username, password, name });
      await UserRepository.save(usuario);
      return res.status(200).send("Usuário criado com sucesso!");
    } catch (error) {
      res.sendStatus(400).send({ message: "error: " + error });
    }
  }
}

export default new UserController();
