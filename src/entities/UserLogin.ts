import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"

import { User } from "./User";

@Entity("newschema.user_logins")
export class UserLogin {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "integer" })
  user_id: number;

  @ManyToOne(() => User, (user) => user.userLogin)
  @JoinColumn({ name: "user_id" })
  user: User;
}
