import { Request } from "express";
import { Logger } from "@overnightjs/logger";

export const logRoute = (
	req: Request,
	controller: string,
	description?: string
) => {
	const { params, method, body, query } = req;
	const { path } = req.route;
	Logger.Info(
		(description ? description : "") +
			"\n" +
			JSON.stringify(
				{ controller, method, path, query, params, body },
				null,
				2
			)
	);
};
export const logResponse = (
	response: any,
	controller: string,
	description?: string
) => {
	Logger.Info(
		(description ? description : "") +
			"\n" +
			JSON.stringify({ controller, response }, null, 2)
	);
};

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
