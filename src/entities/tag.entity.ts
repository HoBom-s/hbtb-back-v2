import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tag {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 24,
  })
  title: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  path: string;

  @Column({
    type: "numeric",
    default: 0,
  })
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
