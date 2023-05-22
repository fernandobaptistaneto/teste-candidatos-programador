import { appDataSource } from "../db/data-source";
import { UserLogin } from "../entities/UserLogin";

export const UserLoginRepository = appDataSource.getRepository(UserLogin);
