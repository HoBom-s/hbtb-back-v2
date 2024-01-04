import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { TRole } from "../types/user.type";
import { Article } from "./article.entity";

@Entity()
class User {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  nickname: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default:
      "https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg",
  })
  profileImg: string;

  @Column({
    default: "user" as TRole,
  })
  role: TRole;

  @Column()
  introduction: string;

  @OneToMany(
    () => Article,
    article => article.writer
  )
  articles: Article[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
