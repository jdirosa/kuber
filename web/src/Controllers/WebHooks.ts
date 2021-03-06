import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import { logRoute } from "../Helpers";
import { getEmails } from "../Services/AWS/s3";
import { sendEmail } from "../Services/Mail/sender";
import { parseMail } from "../Services/Mail/parser";
import { IEmail } from "../Services/Models/Email";
import { parse } from "path";
const controller = "api/webhooks";
@Controller(controller)
export class WebHooks {
	@Get()
	private async sendEmail(req: Request, res: Response) {
		logRoute(req, controller);
		const emails = await getEmails();
		// await sendEmail();
		const parsedEmails: IEmail[] = [];
		for (const e of emails) {
			const parsed = await parseMail(e.email, e.id);
			parsedEmails.push(parsed);
		}

		res.status(200).json(parsedEmails);
	}
}
