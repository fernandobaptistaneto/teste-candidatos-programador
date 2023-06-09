import { UserRepository } from "../repositories/UserRepository";
import { Response, Request } from "express";
import 'moment/locale/pt-br';
import _ from 'lodash';
import moment from "moment";

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

  async deleteUser(req: Request, res: Response) {

    const { id } = req.query;
    const user = await UserRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado!" });
    }
    try {
      await UserRepository.softDelete(user.id);
      return res.status(200).send("Usuário deletado com sucesso!");
    } catch (error) {
      return res.status(500).json({ message: "Internal server error: ", error })
    }
  }

  async updateUser(req: Request, res: Response) {

    const { id } = req.query;
    const user = await UserRepository.findOne({ where: { id: Number(id) } });
    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado!" });
    }
    try {
      await UserRepository.createQueryBuilder().update(user).set({
        updated: () => 'CURRENT_TIMESTAMP',
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
      }).where("id = :id", { id: id },).returning('*').execute()
      return res.status(200).send("Usuário atualizado com sucesso!");
    } catch (error) {
      return res.status(500).json({ message: "Internal server error: ", error })
    }
  }

  async listarUsers(req: Request, res: Response) {
    let list = await UserRepository.find()
    moment.locale('pt-br')
    list.forEach((item)=>{
      item.created = moment(item.created).format('DD/MM/YYYY') as  any
      if(item.updated){
        item.updated = moment(item.updated).format('DD/MM/YYYY') as  any
      }
    })
    return res.status(200).json(list)
  }

}

export default new UserController();
