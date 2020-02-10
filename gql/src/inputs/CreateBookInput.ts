import { InputType, Field } from "type-graphql";
import { Author } from "../models/Author";
import { CreateAuthorInput } from "./CreateAuthorInput";

@InputType()
export class CreateBookInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  newAuthor?: CreateAuthorInput;
  @Field({ nullable: true })
  existingAuthorId?: string;
}
