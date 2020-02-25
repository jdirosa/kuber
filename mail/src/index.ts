import { syncEmails } from "./aws/s3";

async function run() {
  console.log(`🚀 Boom! RAN at ${new Date().toLocaleTimeString()}`);
  console.log(`🕺 Syncing email...`);
  await syncEmails();
  console.log(`👻 All synced up!`);
}
run();
