import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Email } from "./Email";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  authId: string;

  @Field(() => [Email])
  @OneToMany(
    type => Email,
    email => email.user
  )
  emails: Email[];
}
