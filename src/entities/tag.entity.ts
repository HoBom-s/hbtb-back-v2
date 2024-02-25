import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Article from "./article.entity";

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

  @ManyToMany(() => Article, (articles) => articles.tags)
  articles: Article[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Tag;
