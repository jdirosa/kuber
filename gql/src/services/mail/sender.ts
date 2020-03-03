import * as nodemailer from "nodemailer";
import { getSMTPCreds } from "../aws/secrets";
import { formatRecipients } from "./utils/sendMail";
import { ISendMail } from "../../commonModels";
import { uploadFile } from "../aws/s3";

export const sendEmail = async (data: ISendMail) => {
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

  // Send Email
  const { from, to, subject, text, html } = data;
  transporter.sendMail(
    {
      from: from,
      to: formatRecipients(to),
      subject: subject,
      text,
      html: html ? html : `<p>${text}</p>`
    },
    (err, info) => console.log({ err, info })
  );

  // Upload to s3
  const result = await uploadFile(data, "sent");
  return result;
};
