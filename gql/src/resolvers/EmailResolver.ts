import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Email, User } from "../models";
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
    const user = await User.findOne({ where: { id: data.userId } });
    console.log({ user });
    if (!user) {
      throw new Error("Unable to create email for a nonexistent user");
    }
    const email = Email.create(data);
    email.user = user;
    await email.save();
    console.log("Email Created!", { email });
    return email;
  }
}
