import { InputType, Field } from "type-graphql";
import { UpdateAuthorInput } from "./UpdateAuthorInput";

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: UpdateAuthorInput;

  @Field({ nullable: true })
  isPublished?: boolean;
}
