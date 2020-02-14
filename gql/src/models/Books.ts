import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Author } from "./Author";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Author, { nullable: false })
  @ManyToOne(
    type => Author,
    author => author.books
  )
  author: Author;

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;
}
