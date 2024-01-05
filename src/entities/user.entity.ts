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
    type: "nvarchar",
    nullable: false,
    unique: true,
  })
  nickname: string;

  @Column({
    type: "varchar",
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: "varchar",
    nullable: true,
    default:
      "https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg",
  })
  profileImg: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: "user" as TRole,
  })
  role: TRole;

  @Column({
    type: "nvarchar",
    nullable: false,
    default: "Hi!",
  })
  introduction: string;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
