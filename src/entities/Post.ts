import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("newschema.posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "integer" })
  user_id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  message: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;
}
