import * as mailParser from "mailparser";
import { IEmail } from "../Models/Email";
export const parseMail = async (mailString: string): Promise<IEmail> => {
	const response = await mailParser.simpleParser(mailString);
	console.log(JSON.stringify(response, null, 2));
	const from = response.from.value[0];
	const to = response.to.value.map(t => {
		return {
			name: t.name,
			address: t.address,
		};
	});
	const email: IEmail = {
		date: response.date,
		from: {
			address: from.address,
			domain: getDomain(from.address),
			name: from.name,
		},
		to,
	};
	return email;
};

export const getDomain = (email: string) => {
	return email.substr(email.indexOf("@") + 1);
};
