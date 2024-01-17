import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "nvarchar",
    nullable: false,
    length: 16,
  })
  title: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  path: string;

  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  @Generated("increment")
  sortIndex: number;

  @Column({
    type: "varchar",
    nullable: false,
    default: "H",
    length: 1,
  })
  spot: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Category;
