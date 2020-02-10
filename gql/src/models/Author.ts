import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Book } from "./Books";

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Book])
  @OneToMany(
    type => Book,
    book => book.author
  )
  books: Book[];
}
