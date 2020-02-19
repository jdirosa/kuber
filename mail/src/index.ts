import { syncEmails } from "./AWS/s3";

async function run() {
  console.log(`🚀 Boom! RAN at ${new Date().toLocaleTimeString()}`);
  await syncEmails();
}
run();
