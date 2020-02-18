import axios from "axios";
import { IEmail } from "../cloakModels/Email";
import { Email, User } from "../models";
import { getConnection } from "typeorm";
export const init = async () => {
  // Get all emails in s3 to seed the data. Delete existing entries to re-establish until we are in a more stable mode

  try {
    console.log("Fetching seed data");
    const response = await axios.get<IEmail[]>(
      "http://kuberlocal:3001/api/webhooks"
    );

    console.log("Deleting existing data");
    const dels = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Email)
      .where("id > 0", { id: 1 })
      .execute();
    console.log(`Removed ${dels.affected} emails`);
    for (const email of response.data) {
      const myId = "116237562907569550796";
      const newEmail = Email.create({
        subject: email.subject,
        domain: email.from.domain,
        id: email.id,
        from: email.from.address,
        date: email.date,
        body: email.body,
        bodyHtml: email.bodyHtml
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
