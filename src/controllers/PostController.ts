import { Post } from "../entities/Post";
import { PostRepository } from "../repositories/PostsRepository";
import { Request, Response } from "express";

export class PostController {

  async criarPost(req: Request, res: Response) {

    const { title, message } = req.body
    const user_id = req.headers.cookie?.replace('id=', '').trim()


    const userPost = PostRepository.create({
      user_id: Number(user_id), title,
      message
    })
    await PostRepository.save(userPost)
    return res.status(200).json({ message: "Post Criado!" })
  }

  async listarPost(req: Request, res: Response) {

    try {
      const list = await PostRepository.find({
        relations: {
          user: true,

        }, withDeleted: true
      });
      return res.status(200).json({ list });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error: ", error })
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.query;
    try {

      const findPost = await PostRepository.findOne({ where: { id: Number(id) } }) as Post
      if (!findPost) {
        res.status(404).json({ message: "Post não encontrado." })
      }

      await PostRepository.delete(findPost)
      // const deleted = await PostRepository.createQueryBuilder('newschema.users').delete().where("id = :id", { id: id }).returning('*').execute()

      return res.status(200).json({ message: "Post Deleteado com sucesso!" })
    } catch (error) {
      return res.status(500).json({ message: "Internal Error: " + error });
    }
  }

  async atualizarPost(req: Request, res: Response) {
    const { id } = req.query;
    const postExists = await PostRepository.findOne({ where: { id: Number(id) } });

    if (!postExists) {
      res.status(404).json({ message: "Post não encontrado." })
    }

    try {
      await PostRepository.createQueryBuilder().update().set({
        title: req.body.title,
        message: req.body.message
      }).where("id = :id", { id: Number(id) }).execute()
      return res.status(200).json({ message: "Post atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Error:", error })
    }
  }
}

export default new PostController()