import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "nvarchar",
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

export default Tag;
