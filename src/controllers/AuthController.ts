import { UserLoginRepository } from "../repositories/UserLoginRepository";
import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {

  async userLogin(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await UserRepository.findOne({ where: { username } })
    // console.log(user)
    if (!user) {
      return res.status(400).send({ message: "Usuário não existe!" });
    }

    if (user.password !== password) {
      return res.status(400).send({ message: "Senha inválida!" })
    }

    if (user.deleted) {
      return res.status(500).send({ message: " Usuário deletado, contate a TI" })
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })


    try {
      const usuarioLogins = UserLoginRepository.create({ user });
      await UserLoginRepository.save(usuarioLogins);
    } catch (error) {
      console.log("error: " + error);
    }
    res.cookie('id', user.id, { httpOnly: true })

    return res.status(200).json({
      message: "Usuario logado com sucesso!",
      auth: true, token: token, id: user.id
    });
  }

  // async getId(req: Request, res: Response) {
  //   const user_id = req.headers.cookie?.replace('id=', '').trim()
  //   // console.log("id usuário: " + user_id)
  //   return res.json({ message: 'teste' })
  // }
}

export default new AuthController()