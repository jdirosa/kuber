import * as AWS from "aws-sdk";
import { parseMail } from "../mail/parser";

// TODO: Isolate aws functions and create a sync function outside of the AWS file
export const getEmail = async (id: string) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
  });
  const bucket = "jamesdirosa-email";
  const email = await s3
    .getObject({ Bucket: bucket, Key: `processed/${id}` })
    .promise();

  const parsedEmail = await parseMail(email.Body.toString(), id);

  return parsedEmail;
};
