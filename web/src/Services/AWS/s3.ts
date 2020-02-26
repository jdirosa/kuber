import * as awsConfig from "aws-config";
import * as AWS from "aws-sdk";

export const getEmails = async () => {
	const s3 = new AWS.S3({
		accessKeyId: process.env.aws_access_key_id,
		secretAccessKey: process.env.aws_secret_access_key,
	});
	const emails: { id: string; email: string }[] = [];
	const bucket = "jamesdirosa-email";
	const allFiles = await s3.listObjectsV2({ Bucket: bucket }).promise();

	for (const c of allFiles.Contents) {
		const email = await s3
			.getObject({
				Bucket: bucket,
				Key: c.Key,
			})
			.promise();
		emails.push({ id: c.Key, email: email.Body.toString() });
	}

	return emails;
};
