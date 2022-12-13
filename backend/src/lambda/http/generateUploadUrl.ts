import 'source-map-support/register';
import * as middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createAttachmentPresignedUrl, updatePresignedUrlForCar } from '../../businessLogic/cars';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const carId = event.pathParameters.carId;
    const userId = getUserId(event);
    const uploadUrl = await createAttachmentPresignedUrl(carId);
    await updatePresignedUrlForCar(userId, carId);
      return {
        statusCode: 200,
        body: JSON.stringify({
          uploadUrl
        })
      };
  });
  handler.use(
    cors({
      credentials: true
    })
  );

  
