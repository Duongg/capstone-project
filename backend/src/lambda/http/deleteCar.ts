import 'source-map-support/register';
import * as middy from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteCar } from '../../businessLogic/cars';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const carId = event.pathParameters.carId;
    const userId = getUserId(event);
      await deleteCar(userId, carId);
      return {
        statusCode: 200,
        body: ""
      }
  });
  handler.use(
    cors({
      credentials: true
    })
  );

    