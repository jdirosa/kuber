import * as bodyParser from "body-parser";
import * as controllers from "./Controllers";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import * as cors from "cors";
import nocache from "nocache";
export class ApiServer extends Server {
	private readonly START_MESSAGE = (port: number) =>
		`Express server started on port ${port}`;

	constructor() {
		super(true);
		this.app.use(cors.default());
		this.app.options("*", cors.default());
		this.app.use(nocache());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.setupControllers();
	}

	private setupControllers(): void {
		const instances = [];
		for (const c in controllers) {
			if (controllers.hasOwnProperty(c)) {
				const controller = (controllers as any)[c];
				instances.push(new controller());
			}
		}
		super.addControllers(instances);
	}

	public start(port: number): void {
		this.app.get("*", (req, res) => {
			res.status(200).json({});
		});
		this.app.listen(port, () => {
			Logger.Imp(this.START_MESSAGE(port));
		});
	}
}
