import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUser {
  @Field()
  authId: string;
}
