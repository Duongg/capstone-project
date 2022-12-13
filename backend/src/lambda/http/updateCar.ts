import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateCar } from '../../businessLogic/cars';
import { UpdateCarRequest } from '../../requests/UpdateCarRequest';
import { getUserId } from '../utils';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const carId = event.pathParameters.carId;
    const updatedCar: UpdateCarRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    await updateCar(updatedCar, userId, carId);
      return {
        statusCode: 201,
        body: ""
      };
  });
  handler.use(
    cors({
      credentials: true
    })
  );