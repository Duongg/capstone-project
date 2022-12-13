import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { getCarsForUser as getCarsForUser } from '../../businessLogic/cars';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';
// Car: Get all Car items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    const cars = await getCarsForUser(userId);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items: cars
      })
    }
  });
  handler.use(
    cors({
      credentials: true
    })
  );