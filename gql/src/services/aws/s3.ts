import * as AWS from "aws-sdk";
import { parseMail } from "../mail/parser";

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});
const bucket = "jamesdirosa-email";
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

export async function moveFile(key: string, destinationKey: string) {
  // Move to processed folder
  await s3
    .copyObject({
      Bucket: bucket,
      CopySource: `${bucket}/${key}`,
      Key: destinationKey
    })
    .promise();

  // Delete from original bucket
  await s3
    .deleteObject({
      Bucket: bucket,
      Key: key
    })
    .promise();
}
