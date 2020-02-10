import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateAuthorInput {
  @Field({ nullable: false })
  name?: string;
}
