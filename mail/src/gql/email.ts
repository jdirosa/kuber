import { request } from "graphql-request";
import { IEmail } from "../Models/Email";

export const saveEmail = async (email: IEmail) => {
  const userId = "1"; // TODO: Fix
  const mut = `mutation {
	CreateEmail(
	  data: { id: "${email.id}", from: "${email.from.address}", userId: "${userId}", subject: "${email.subject}", date: "${email.date}", domain: "${email.from.domain}" }
	) {
	  id
	}
  }`;

  const response = await request("http://localhost:32000", mut);
  return response;
};
