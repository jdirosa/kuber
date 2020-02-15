import * as awsConfig from "aws-config";
import * as AWS from "aws-sdk";

export const getEmails = async () => {
	const s3 = new AWS.S3({});

	const options = {
		Bucket: "jamesdirosa-email",
		Key: "gbvvvkg8uf10o562eudqo487u89lv6b8vrb48ug1",
	};
	const response = await s3.getObject(options).promise();

	return response.Body.toString();
};
