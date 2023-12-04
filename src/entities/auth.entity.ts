import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Auth {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  userId: string;

  @Column()
  refreshToken: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Auth;
