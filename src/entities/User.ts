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

  @Column({ type: "timestamp with time zone" })
  created?: Date;

  @Column({ type: "timestamp with time zone" })
  updated?: Date;

  @Column({ type: "timestamp with time zone" })
  deleted?: Date;



  @OneToMany(() => UserLogin, (userLogin) => userLogin.user)
  userLogin: UserLogin[];

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];
}
