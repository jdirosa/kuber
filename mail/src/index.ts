import { syncEmails } from "./aws/s3";
import { sendEmail } from "./Mail/sender";
import { ISendMail } from "./models";

async function run() {
  console.log(`🚀 Boom! RAN at ${new Date().toLocaleTimeString()}`);
  await syncEmails();

  // test run
  await sendEmail(sampleEmail);
}
run();

const sampleEmail: ISendMail = {
  from: '"Mail Cloak Ghost 👻" <me@mailcloaked.com>', // sender address
  to: [{ name: "Jimmy", email: "jdirosa@gmail.com" }], // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
  sentDate: new Date()
};
