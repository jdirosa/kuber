import { InputType, Field } from "type-graphql";
import { Author } from "../models/Author";

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;
}
