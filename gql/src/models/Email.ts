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

  // This will need to be an FK to user
  @Field(() => String)
  @ManyToOne(
    type => User,
    user => user.emails
  )
  user: User;
}
