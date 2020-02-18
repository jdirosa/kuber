import axios from "axios";
import { IEmail } from "../cloakModels/Email";
import { Email, User } from "../models";
import { getConnection } from "typeorm";
export const init = async (refresh: boolean) => {
  // Get all emails in s3 to seed the data. Delete existing entries to re-establish until we are in a more stable mode

  try {
    if (refresh) {
      console.log("Deleting existing data");
      const dels = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Email)
        .where("id > 0")
        .execute();
      console.log(`Removed ${dels.affected} emails`);
    }
    console.log("Fetching seed data");
    const response = await axios.get<IEmail[]>(
      "http://kuberlocal:3001/api/webhooks"
    );
    const existingEmails = await Email.find();
    for (const email of response.data) {
      if (existingEmails.some(e => e.id === email.id)) {
        continue;
      }
      console.log("New email found. Adding ID: " + email.id);
      const myId = "116237562907569550796";
      if (email.id === "") {
        console.log("SKIPPING WEIRD STUFF");
        console.log(email);
        continue;
      }
      console.log("creating new email");
      console.log(email);
      const newEmail = Email.create({
        subject: email.subject,
        domain: email.from.domain,
        id: email.id,
        from: email.from.address,
        date: email.date
      });
      const user = await User.findOne({ where: { authId: myId } });
      newEmail.user = user;

      console.log(`Saving email`, { newEmail });
      await Email.save(newEmail);
    }
  } catch (err) {
    console.log({ err });
    console.error("FAILED TO GET SEED DATA");
  }
};
