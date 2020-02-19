import * as AWS from "aws-sdk";
import { parseMail } from "../Mail/parser";
import { saveEmail } from "../gql/email";

// TODO: Isolate aws functions and create a sync function outside of the AWS file
export const syncEmails = async () => {
  const s3 = new AWS.S3({});
  const emails: { id: string; email: string }[] = [];
  const bucket = "jamesdirosa-email";
  const allFiles = await s3.listObjectsV2({ Bucket: bucket }).promise();

  const items = allFiles.Contents.filter(
    c => c.Key.indexOf("processed") === -1
  );

  if (!items.length) {
    console.log("No emails to process at this time");
    return [];
  }
  for (const c of items) {
    try {
      // skip the processed
      if (c.Key.indexOf("processed") >= 0) {
        continue;
      }
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
    }
  }

  return emails;
};
