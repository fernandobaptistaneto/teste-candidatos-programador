import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserLogin } from "./UserLogin";
import { Post } from "./Post";

@Entity("newschema.users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => UserLogin, (userLogin) => userLogin.user)
  userLogin: UserLogin[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];
}
