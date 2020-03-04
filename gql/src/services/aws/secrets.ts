import * as AWS from "aws-sdk";
import { SMTPCreds } from "../models/SMTPCreds";

const region = "us-east-1";
const KEYS = {
  SMTP: "Mailcloak-SMTP"
};

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
  region: region,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});

export const getSMTPCreds = async (): Promise<SMTPCreds> => {
  try {
    const response = await client
      .getSecretValue({ SecretId: KEYS.SMTP })
      .promise();
    return handleGetValue(response);
  } catch (err) {
    handleSecretError(err);
  }
  return null;
};

const handleSecretError = (err: AWS.AWSError) => {
  if (err.code === "DecryptionFailureException")
    // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
    // Deal with the exception here, and/or rethrow at your discretion.
    throw err;
  else if (err.code === "InternalServiceErrorException")
    // An error occurred on the server side.
    // Deal with the exception here, and/or rethrow at your discretion.
    throw err;
  else if (err.code === "InvalidParameterException")
    // You provided an invalid value for a parameter.
    // Deal with the exception here, and/or rethrow at your discretion.
    throw err;
  else if (err.code === "InvalidRequestException")
    // You provided a parameter value that is not valid for the current state of the resource.
    // Deal with the exception here, and/or rethrow at your discretion.
    throw err;
  else if (err.code === "ResourceNotFoundException")
    // We can't find the resource that you asked for.
    // Deal with the exception here, and/or rethrow at your discretion.
    throw err;
};
const handleGetValue = (
  data: AWS.SecretsManager.GetSecretValueResponse
): SMTPCreds => {
  if ("SecretString" in data) {
    return JSON.parse(data.SecretString);
  }
  return null;
};
