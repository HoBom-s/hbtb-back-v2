import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tag {
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

  // 클릭 횟수
  @Column({
    type: "numeric",
    default: 0,
  })
  count: number;

  @Column({
    type: "simple-array",
  })
  articleId: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
