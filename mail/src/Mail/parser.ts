import * as mailParser from "mailparser";
import { IEmail } from "../Models/Email";
export const parseMail = async (
  mailString: string,
  s3Id: string
): Promise<IEmail> => {
  const response = await mailParser.simpleParser(mailString);
  const from = response.from.value[0];
  const to = response.to.value.map(t => {
    return {
      name: t.name,
      address: t.address
    };
  });
  const { subject, text } = response;

  const email: IEmail = {
    id: s3Id,
    date: new Date(response.date),
    from: {
      address: from.address,
      domain: getDomain(from.address),
      name: from.name
    },
    to,
    subject,
    body: text,
    bodyHtml: "" // TODO: Will add later
  };
  return email;
};

export const getDomain = (email: string) => {
  if (email.indexOf("@") < 0) {
    return "";
  }
  return email.substr(email.indexOf("@") + 1);
};
