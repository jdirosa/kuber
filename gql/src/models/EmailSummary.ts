import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class EmailSummary {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => String)
  from: string;

  // This will need to be an FK to user
  @Field(() => Number)
  count: number;

  @Field(() => Boolean)
  isBlocked: boolean;
}
