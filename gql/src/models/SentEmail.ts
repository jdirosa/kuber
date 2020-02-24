import { Entity, BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class SentEmail extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column({ default: "" })
  to: string;

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
