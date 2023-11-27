import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({
    default: () => "",
  })
  profileImg: string;

  @Column()
  role: "admin" | "user";

  @Column()
  introduction: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
