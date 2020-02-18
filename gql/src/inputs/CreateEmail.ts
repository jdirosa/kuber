import { InputType, Field } from "type-graphql";

@InputType()
export class CreateEmail {
  @Field()
  id: string; // s3 ARN

  @Field()
  from: string;

  @Field()
  userId: string;

  @Field()
  subject: string;

  @Field()
  body: string;
}
