import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";
import Tag from "./tag.entity";

@Entity()
class Article {
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
    unique: true,
  })
  path: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  user: User;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Article;
