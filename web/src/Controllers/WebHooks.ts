import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import { logRoute } from "../Helpers";
import { getEmails } from "../Services/AWS/s3";
import { sendEmail } from "../Services/Mail/sender";
import { parseMail } from "../Services/Mail/parser";
const controller = "api/webhooks";
@Controller(controller)
export class WebHooks {
	@Get()
	private async sendEmail(req: Request, res: Response) {
		logRoute(req, controller);
		const resp = await getEmails();
		// await sendEmail();
		const parsed = await parseMail(resp);
		console.log({ parsed });
		res.status(200).send(JSON.stringify(parsed, null, 2));
	}
}
