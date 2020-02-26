import * as AWS from "aws-sdk";
import { parseMail } from "../Mail/parser";
import { saveEmail } from "../gql/email";

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});
const bucket = "jamesdirosa-email";
// TODO: Isolate aws functions and create a sync function outside of the AWS file
export const syncEmails = async () => {
  const emails: { id: string; email: string }[] = [];
  const allFiles = await s3.listObjectsV2({ Bucket: bucket }).promise();

  const items = allFiles.Contents.filter(
    c => c.Key.indexOf("processed") === -1 && c.Key.indexOf("sent") === -1
  );

  if (!items.length) {
    console.log("🤖 I Couldn't find any emails to sync.");
    return [];
  }
  for (const c of items) {
    try {
      // Get the email
      const email = await s3
        .getObject({
          Bucket: bucket,
          Key: c.Key
        })
        .promise();

      // Parse it and save to DB
      const parsedEmail = await parseMail(email.Body.toString(), c.Key);
      const saveEmailResponse = await saveEmail(parsedEmail);
      console.log(saveEmailResponse);

      // Move to processed folder
      await s3
        .copyObject({
          Bucket: bucket,
          CopySource: `${bucket}/${c.Key}`,
          Key: `processed/${c.Key}`
        })
        .promise();

      // Delete from original bucket
      await s3
        .deleteObject({
          Bucket: bucket,
          Key: c.Key
        })
        .promise();
    } catch (err) {
      console.error("Unable to move file ", err);
      throw new Error(err);
    }
  }

  return emails;
};

export async function uploadFile(body: any, folder?: string) {
  // TODO: GUID this
  const id = new Date().getTime().toString();
  const key = folder ? `${folder}/${id}` : id;
  const result = await s3
    .putObject({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(body)
    })
    .promise();

  if (result.$response.error) {
    throw new Error(result.$response.error.message);
  }
  return id;
}
