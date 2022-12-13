import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as middy from 'middy';
import { CreateCarRequest } from '../../requests/CreateCarRequest';
import { getUserId } from '../utils';
import { createCar } from '../../businessLogic/cars';
import { cors } from 'middy/middlewares';
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newCar: CreateCarRequest = JSON.parse(event.body);
    // Car: Implement creating a new Car item
    const userId = getUserId(event);
    const item = await createCar(newCar, userId);
    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    };
  });
  handler.use(
    cors({
      credentials: true
    })
  );
