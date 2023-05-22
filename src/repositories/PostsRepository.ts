import { appDataSource } from "../db/data-source";
import { Post } from "../entities/Post";

export const PostRepository = appDataSource.getRepository(Post);
