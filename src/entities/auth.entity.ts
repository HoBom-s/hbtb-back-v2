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
    type: "varchar",
    nullable: false,
  })
  userId: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Auth;
