import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../types/user.type";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
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
    default: "user" as Role,
  })
  role: Role;

  @Column({
    type: "nvarchar",
    nullable: false,
    default: "Hi!",
  })
  introduction: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
