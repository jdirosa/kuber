import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

// Reporting type. might not be needed
@ObjectType()
export class EmailSummary {
  @Field(() => User)
  user: User;

  @Field(() => String)
  domain: string;

  // This will need to be an FK to user
  @Field(() => Number)
  count: number;

  @Field(() => Boolean)
  isBlocked: boolean;
}
