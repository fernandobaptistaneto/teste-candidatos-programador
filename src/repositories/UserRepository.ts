import { appDataSource } from "../db/data-source";
import { User } from "../entities/User";

export const UserRepository = appDataSource.getRepository(User);
