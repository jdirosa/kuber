import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Email } from "./Email";
import { SentEmail } from "./SentEmail";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  emailAddress: string;

  @Field(() => String)
  @Column()
  authId: string;

  @Field(() => [Email])
  @OneToMany(
    type => Email,
    email => email.user
  )
  emails: Email[];

  @Field(() => [Email])
  @OneToMany(
    type => SentEmail,
    email => email.user
  )
  sendEmails: Email[];
}
