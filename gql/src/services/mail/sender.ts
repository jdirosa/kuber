import * as nodemailer from "nodemailer";
import { getSMTPCreds } from "../aws/secrets";

export const sendEmail = async () => {
  const creds = await getSMTPCreds(); // TODO: load once.. should not load per call
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: creds.user,
      pass: creds.pass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: '"Fred Foo 👻" <me@mailcloaked.com>', // sender address
      to: "Jimmy, <test@mailcloaked.com>", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    },
    null
  );
  console.log({ info });
};
