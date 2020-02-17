import { ApiServer } from "./server";

async function start() {
	const port = 3001;
	const api = new ApiServer();
	api.start(port);
	console.log(`🚀 Boom! WebHook Server running at ${port}`);
}
start();
