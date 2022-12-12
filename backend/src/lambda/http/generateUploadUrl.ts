import 'source-map-support/register';
import * as middy from 'middy';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createAttachmentPresignedUrl, updatePresignedUrlForTodo } from '../../businessLogic/todos';
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    const uploadUrl = await createAttachmentPresignedUrl(todoId);
    await updatePresignedUrlForTodo(userId, todoId);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          uploadUrl
        })
      };
  });
