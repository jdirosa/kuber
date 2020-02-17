import { InputType, Field } from "type-graphql";
import { User } from "../models";

@InputType()
export class CreateEmail {
  @Field()
  id: string; // s3 ARN

  @Field()
  from: string;

  @Field()
  user: User;
}
