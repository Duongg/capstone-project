import * as AWS from 'aws-sdk';
import { createLogger } from '../utils/logger';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CarItem } from '../models/CarItem';
import { CarUpdate } from '../models/CarUpdate';

const logger = createLogger('Cars-access');
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class CarAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly carsTable = process.env.CARS_TABLE) {
  }

  async getUserCars(userId: string): Promise<CarItem[]> {
    logger.info(`Getting Cars list for user with id: ${userId}`);

    const result = await this.docClient.query({
      TableName: this.carsTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      }
    }).promise()

    const items = result.Items
    return items as CarItem[]
  }

  async createCar(carItem: CarItem): Promise<CarItem> {
    logger.info(`Create new Car for user with id: ${carItem.userId}`);

    await this.docClient.put({
      TableName: this.carsTable,
      Item: carItem
    }).promise();
    return carItem;
  }

  async getCarForUserById(userId: string, carId: string): Promise<CarItem> {
    logger.info(`Get Car for user with id: ${userId} by car id: ${carId}`);
    const resultSet = await this.docClient.query({
      TableName: this.carsTable,
      KeyConditionExpression: "userId = :userId AND carId = :carId",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":carId": carId
      }
    }).promise();
    const item = resultSet.Items;
    return item[0] as CarItem;
  }

  async updateCar(carItem: CarUpdate, userId: string, carId: string) {
    const current = this.getCarForUserById(userId, carId);

    if (!current) {
      throw new Error(`Cannot find Car by id ${carId} for user with id ${userId}`);
    }

    logger.info(`Update Car by id ${carId} for user with id ${userId}`);
    await this.docClient.update({
      TableName: this.carsTable,
      Key: {
        userId,
        carId
      },
      UpdateExpression: "SET #name = :name, #dueDate = :dueDate, #done = :done",
      ExpressionAttributeNames: {
        "#name": "name",
        "#dueDate": "dueDate",
        "#done": "done"
      },
      ExpressionAttributeValues: {
        ":name": carItem.name,
        ":dueDate": carItem.dueDate,
        ":done": carItem.done
      }
    }).promise();
  }

  async deleteCar(userId: string, carId: string) {
    logger.info(`Delete Car with id: ${carId} of user with id: ${userId}`);
    await this.docClient.delete({
      TableName: this.carsTable,
      Key: {
        userId,
        carId
      }
    }).promise();
  }

  async updatePresignedUrlForCar(attachmentUrl: string, userId: string, carId: string) {
    const currentCar = this.getCarForUserById(userId, carId);
    if (!currentCar) {
      throw new Error(`Cannot find Car by id ${carId} for user with id ${userId}`);
    }

    logger.info(`Update presigned url for Car by id ${carId} for user with id ${userId}`);
    await this.docClient.update({
      TableName: this.carsTable,
      Key: {
        userId,
        carId
      },
      UpdateExpression: "SET #attachmentUrl = :attachmentUrl",
      ExpressionAttributeNames: {
        "#attachmentUrl": "attachmentUrl"
      },
      ExpressionAttributeValues: {
        ":attachmentUrl": attachmentUrl
      }
    }).promise();
  }
}