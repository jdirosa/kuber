import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Email, User } from "../models";
import { CreateEmail } from "../inputs";
import { EmailSummary } from "../models/EmailSummary";
import { BlockedDomains } from "../models/BlockedDomains";
import { getEmail } from "../services/aws/s3";
import { IEmail } from "../cloakModels/Email";
import { HtmlEmail } from "../models/HtmlEmail";

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  async emails() {
    const emails = await Email.find({ relations: ["user"] });
    return emails.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ); // TODO: Let sql do the sorting
  }
  @Query(() => Email)
  email(@Arg("id") id: string) {
    return Email.findOne({ where: { id }, relations: ["user"] });
  }
  @Query(() => [EmailSummary])
  async emailSummary(@Arg("userAuthId") id: string) {
    const user = await User.findOne({ where: { authId: id } });
    const emailSummary: EmailSummary[] = [];
    if (!user) {
      throw new Error("Unable to get email summary for unknow user");
    }
    const emails = await Email.find({ where: { user } });
    // TODO: GroupBy in SQL
    const distinctDomains = Array.from(new Set(emails.map(e => e.domain)));
    const blockedDomains = await BlockedDomains.find({ where: { user } });
    for (const d of distinctDomains) {
      let summary: EmailSummary = {
        count: emails.filter(e => e.domain === d).length,
        domain: d,
        isBlocked: blockedDomains.some(b => b.domain === d),
        user
      };
      emailSummary.push(summary);
    }
    return emailSummary;
  }
  @Mutation(() => Email)
  async CreateEmail(@Arg("data") data: CreateEmail) {
    const user = await User.findOne({ where: { id: data.userId } });
    console.log({ user, data });
    if (!user) {
      throw new Error(
        "Unable to create email for a nonexistent user " + data.userId
      );
    }
    const email = Email.create(data);
    email.user = user;
    await email.save();
    return email;
  }
  @Query(() => HtmlEmail)
  async GetEmailHTML(@Arg("data") data: String) {
    const { from, body, bodyHtml }: IEmail = await getEmail(data.toString());
    const response: HtmlEmail = {
      from: {
        address: from.address,
        name: from.name
      },
      body,
      bodyHtml
    };
    return response;
  }
}
