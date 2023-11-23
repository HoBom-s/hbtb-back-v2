import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}

export default User;
