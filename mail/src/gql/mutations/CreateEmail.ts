import { IEmail } from "../../models";

export const CreateEmailMutation = (
  email: IEmail,
  userId: string
) => `mutation {
	CreateEmail(
	  data: { id: "${email.id}", from: "${email.from.address}", userId: "${userId}", subject: "${email.subject}", date: "${email.date}", domain: "${email.from.domain}" }
	) {
	  id
	}
  }`;
