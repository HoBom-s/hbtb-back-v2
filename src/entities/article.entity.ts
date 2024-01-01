import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  tags: string;

  @Column()
  writers: string;

  @Column({
    nullable: false,
  })
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
