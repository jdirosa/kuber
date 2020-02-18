import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Email extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  from: string;

  @Field(() => String)
  @Column()
  domain: string;
  // This will need to be an FK to user
  @Field(() => User)
  @ManyToOne(
    type => User,
    user => user.emails
  )
  user: User;

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => String)
  @Column()
  subject: string;

  @Field(() => String)
  @Column()
  body: string;

  @Field(() => String)
  @Column()
  bodyHtml: string;
}
