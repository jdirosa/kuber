import { InputType, Field } from "type-graphql";

@InputType()
export class SendEmail {
  @Field()
  userId: string; // s3 id

  @Field(() => [String])
  to: string[];

  @Field()
  subject: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  html?: string;
}
