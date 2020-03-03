import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Email, User } from "../models";
import { CreateEmail, SendEmail } from "../inputs";
import { EmailSummary } from "../models/EmailSummary";
import { BlockedDomains } from "../models/BlockedDomains";
import { getEmail, moveFile } from "../services/aws/s3";
import { HtmlEmail } from "../models/HtmlEmail";
import { SentEmail } from "../models/SentEmail";
import { sendEmail } from "../services/mail/sender";
import { IEmail } from "../commonModels";
import { getAuthUser } from "../auth/auth0";
import { Context } from "../auth/models";
import { log, logError } from "../utils";

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  async emails(@Ctx() ctx: Context) {
    await getAuthUser(ctx);
    const emails = await Email.find({
      relations: ["user"],
      order: { date: "DESC" }
    });
    return emails;
  }
  @Query(() => [SentEmail])
  async sentEmails(@Ctx() ctx: Context) {
    await getAuthUser(ctx);
    const emails = await SentEmail.find({
      relations: ["user"],
      order: { date: "DESC" }
    });
    return emails;
  }
  @Query(() => Email)
  async email(@Arg("id") id: string, @Ctx() ctx: Context) {
    await getAuthUser(ctx);
    return Email.findOne({ where: { id }, relations: ["user"] });
  }
  @Query(() => [EmailSummary])
  async emailSummary(@Arg("userAuthId") id: string, @Ctx() ctx: Context) {
    await getAuthUser(ctx);
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
  @Mutation(() => Number)
  async DeleteEmail(@Arg("data") data: string, @Ctx() ctx: Context) {
    await getAuthUser(ctx);
    await moveFile(`processed/${data}`, `deleted/${data}`);
    await Email.delete(data);

    return 1;
  }
  @Mutation(() => Email)
  async CreateEmail(@Arg("data") data: CreateEmail, @Ctx() ctx: Context) {
    // await getAuthUser(ctx);
    const user = await User.findOne({ where: { id: data.userId } });
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
  @Mutation(() => SentEmail)
  async SendEmail(@Arg("data") data: SendEmail, @Ctx() ctx: Context) {
    await getAuthUser(ctx);

    const user = await User.findOne({ where: { id: data.userId } });
    user.emailAddress;
    if (!user) {
      throw new Error(
        "Unable to create email for a nonexistent user " + data.userId
      );
    }
    if (!data.html && !data.text) {
      throw new Error("One of HTML or Text must be provided");
    }
    const date = new Date();
    let id = "";
    try {
      id = await sendEmail({
        from: '"Jimmy 👻" <jimmy@mailcloaked.com>', // TODO Get from DB
        sentDate: date,
        subject: data.subject,
        to: data.to.map(t => {
          return { email: t };
        }),
        html: data.html,
        text: data.text
      });
      log("email sent!", { id, to: data.subject });
    } catch (e) {
      logError("Error sending email");
      throw new Error(e);
    }

    const email = SentEmail.create({
      id,
      date: new Date(),
      subject: data.subject,
      to: data.to.join(", ")
    });
    email.user = user;
    await email.save();

    return email;
  }
  @Query(() => HtmlEmail)
  async GetEmailHTML(@Arg("data") data: String, @Ctx() ctx: Context) {
    await getAuthUser(ctx);
    const { from, body, bodyHtml, subject }: IEmail = await getEmail(
      data.toString()
    );
    const response: HtmlEmail = {
      from: {
        address: from.address,
        name: from.name
      },
      body,
      bodyHtml,
      subject
    };
    return response;
  }
}
