import { syncEmails } from "./aws/s3";
import dotenv from "dotenv";
import cron from "node-cron";

async function run() {
  console.log(`🚀 Boom! starting run at ${new Date().toLocaleTimeString()}`);
  await syncEmails();
  console.log(`👻 All synced up!`);
}
dotenv.config();
console.log(
  process.env.KUBER_GQL_SERVICE_HOST,
  process.env.KUBER_GQL_SERVICE_PORT
);
cron.schedule("*/1 * * * *", async () => {
  try {
    await run();
    console.log("Completed with no errors");
  } catch (e) {
    console.error("Completed with errors", e);
  }
});
