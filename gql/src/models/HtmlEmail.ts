import { ObjectType, Field } from "type-graphql";
// TODO: Refactor name. This is email. email should be email metadata
@ObjectType()
export class HtmlEmail {
  @Field(() => Address)
  from: Address;

  @Field(() => String)
  body: string;
  @Field(() => String)
  bodyHtml: string;
}

@ObjectType()
export class Address {
  @Field(() => String)
  name: string;
  @Field(() => String)
  address: string;
}
