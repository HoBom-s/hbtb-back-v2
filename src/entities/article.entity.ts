import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    nullable: true,
    default:
      "https://cdn.vectorstock.com/i/preview-1x/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg",
  })
  thumbnail: string;

  @Column({
    type: "nvarchar",
    nullable: false,
  })
  title: string;

  @Column({
    type: "nvarchar",
    nullable: false,
  })
  subtitle: string;

  @Column({
    type: "nvarchar",
    nullable: false,
  })
  contents: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  path: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({
    name: "userId",
  })
  writer: string; // WIP_1

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "articles_tags",
    joinColumn: {
      name: "article",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
  })
  tags: Tag[]; // WIP_2

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
