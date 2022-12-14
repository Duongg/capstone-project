import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';
const XAWS = AWSXRay.captureAWS(AWS);

// Car: Implement the fileStogare logic
const logger = createLogger('attachmentUtils');
const bucketName = process.env.S3_BUCKET_NAME;
const signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION;
const s3_bucket = new XAWS.S3({
  signatureVersion: 'v4'
});

export async function createPresignUrl(carId: string): Promise<string> {
  return s3_bucket.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: carId,
    Expires: parseInt(signedUrlExpiration)
  });
}

export function createAttachmentUrl(carId: string): string {
  return `https://${bucketName}.s3.amazonaws.com/${carId}`;
}

export async function deleteAttachmentUrl(carId: string) {
  const params = {
    Bucket: bucketName,
    Key: carId
  };

  try {
    await s3_bucket.headObject(params).promise();
    try {
      return await s3_bucket.deleteObject(params).promise();
    }
    catch (e) {
      logger.error("Error occur when deleting S3 bucket object. Error: " + JSON.stringify(e));
    }
  } catch (e) {
    logger.error("Unable to retrieve S3 bucket object. Error: " + e.code);
  }
}