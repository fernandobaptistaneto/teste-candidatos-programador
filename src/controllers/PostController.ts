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
}

export default new PostController()