import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

import { TRole } from "../types/user.type";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
