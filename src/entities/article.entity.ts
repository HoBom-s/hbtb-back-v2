import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
    default:
      "https://cdn.vectorstock.com/i/preview-1x/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg",
  })
  thumbnail: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  subtitle: string;

  @Column({
    nullable: false,
  })
  contents: string;

  // @Column("simple-array") // WIP_2
  // tags: string[];

  @Column({
    nullable: false,
  })
  path: string;

  @ManyToOne(
    () => User,
    user => user.articles
  )
  @JoinColumn({name: "userId"})
  writer: string; // WIP_1
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
