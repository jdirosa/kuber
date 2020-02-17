import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Email } from "../models";
import { CreateEmail } from "../inputs";

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  emails() {
    return Email.find({ relations: ["user"] });
  }
  @Query(() => Email)
  email(@Arg("id") id: string) {
    return Email.findOne({ where: { id }, relations: ["user"] });
  }
  @Mutation(() => Email)
  async CreateEmail(@Arg("data") data: CreateEmail) {
    const user = await Email.find({ where: { id: data.user.authId } });
    console.log(user);
    if (user.length <= 0) {
      throw new Error("Unable to create email for a nonexistent user");
    }
    const email = Email.create(data);
    await email.save();
    console.log("Email Created!", { email });
    return email;
  }
}
