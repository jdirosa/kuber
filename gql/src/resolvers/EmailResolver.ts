import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Email, User } from "../models";
import { CreateEmail, SendEmail } from "../inputs";
import { EmailSummary } from "../models/EmailSummary";
import { BlockedDomains } from "../models/BlockedDomains";
import { getEmail } from "../services/aws/s3";
import { HtmlEmail } from "../models/HtmlEmail";
import { SentEmail } from "../models/SentEmail";
import { sendEmail } from "../services/mail/sender";
import { IEmail } from "../commonModels";

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  async emails() {
    const emails = await Email.find({
      relations: ["user"],
      order: { date: "DESC" }
    });
    return emails;
  }
  @Query(() => [SentEmail])
  async sentEmails() {
    const emails = await SentEmail.find({
      relations: ["user"],
      order: { date: "DESC" }
    });
    return emails;
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
  @Mutation(() => SentEmail)
  async SendEmail(@Arg("data") data: SendEmail) {
    console.log("looking for user");
    const user = await User.findOne({ where: { id: data.userId } });

    if (!user) {
      throw new Error(
        "Unable to create email for a nonexistent user " + data.userId
      );
    }
    console.log("found user");
    console.log(user);
    if (!data.html && !data.text) {
      throw new Error("One of HTML or Text must be provided");
    }
    const date = new Date();
    let id = "";
    try {
      console.log("Sending!");
      id = await sendEmail({
        from: '"Ghost 👻" <jimmy@mailcloaked.com>',
        sentDate: date,
        subject: data.subject,
        to: data.to.map(t => {
          return { email: t };
        }),
        html: data.html,
        text: data.text
      });
      console.log("Sent");
    } catch (e) {
      console.error("Error sending email");
      console.error(e);
      throw new Error("Failure while sending");
    }

    console.log("Creating email with id " + id);
    const email = SentEmail.create({
      id,
      date: new Date(),
      subject: data.subject,
      to: data.to.join(", ")
    });
    email.user = user;
    await email.save();
    console.log("returning email");
    console.log(email);
    return email;
  }
  @Query(() => HtmlEmail)
  async GetEmailHTML(@Arg("data") data: String) {
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
