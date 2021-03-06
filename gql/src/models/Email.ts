import { Entity, BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Email extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column({ default: "" })
  from: string;

  // TODO: Probably get rid of this
  @Field(() => String)
  @Column({ default: "" })
  domain: string;

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
  @Column({ default: "" })
  subject: string;

  @Field(() => Boolean)
  @Column({ default: false })
  read: boolean;
}
