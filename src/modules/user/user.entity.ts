import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  profileImg: string;

  @Column()
  role: string;

  @Column()
  introduction: string;
}

export default User;
