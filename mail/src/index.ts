import { syncEmails } from "./aws/s3";
import dotenv from "dotenv";
import cron from "node-cron";

async function run() {
  console.log(`\n🚀 Boom! starting run at ${new Date().toLocaleTimeString()}`);
  await syncEmails();
  console.log(`👻 All synced up!`);
}
dotenv.config();
cron.schedule("*/1 * * * *", async () => {
  try {
    await run();
    console.log("Completed with no errors");
  } catch (e) {
    console.error("Completed with errors", e);
  }
});
