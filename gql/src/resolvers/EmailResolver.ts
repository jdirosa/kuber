import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Email, User } from "../models";
import { CreateEmail } from "../inputs";
import { EmailSummary } from "../models/EmailSummary";
import { BlockedDomains } from "../models/BlockedDomains";

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  async emails() {
    const emails = await Email.find({ relations: ["user"] });
    return emails.sort(
      (a, b) => a.date.getMilliseconds() - b.date.getMilliseconds()
    );
  }
  @Query(() => Email)
  email(@Arg("id") id: string) {
    return Email.findOne({ where: { id }, relations: ["user"] });
  }
  @Query(() => EmailSummary)
  async emailSummary(@Arg("userAuthId") id: string) {
    const user = await User.findOne({ where: { authId: id } });

    if (!user) {
      throw new Error("Unable to get email summary for unknow user");
    }
    const emails = await Email.find({ where: { user } });
    const isBlocked = await BlockedDomains.find({});
    const count = emails.length;
    console.log({ isBlocked, count });
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
