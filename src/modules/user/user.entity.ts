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

  @Column({
    unique: true,
  })
  nickname: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: () => "",
  })
  profileImg: string;

  @Column()
  role: "admin" | "user";

  @Column()
  introduction: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
