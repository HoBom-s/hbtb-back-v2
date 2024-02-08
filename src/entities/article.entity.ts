import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({
    type: "simple-array",
  })
  tags: string[];

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
