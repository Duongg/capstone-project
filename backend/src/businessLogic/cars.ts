import { CarAccess } from "../dataLayer/CarAccess";
import { CreateCarRequest } from "../requests/CreateCarRequest";
import { UpdateCarRequest } from "../requests/UpdateCarRequest";
import { createAttachmentUrl, createPresignUrl, deleteAttachmentUrl } from "../helpers/attachmentUtils";

import * as uuid from 'uuid';

const carAccess = new CarAccess();

export async function getCarsForUser(userId: string) {
  return await carAccess.getUserCars(userId);
}

export async function createCar(createCarRequest: CreateCarRequest, userId: string) {
  const carId = uuid.v4();
  const createdAt = new Date().toISOString();
  return await carAccess.createCar({
    userId: userId,
    carId: carId,
    createdAt: createdAt,
    name: createCarRequest.name,
    dueDate: createCarRequest.dueDate,
    done: false
  });
}

export async function updateCar(updateCarRequest: UpdateCarRequest, userId: string, carId: string) {
  return await carAccess.updateCar({
    name: updateCarRequest.name,
    dueDate: updateCarRequest.dueDate,
    done: updateCarRequest.done
  }, userId, carId);
}

export async function deleteCar(userId: string, carId: string) {
  // delete bucket object if exist
  const currentCar = await carAccess.getCarForUserById(userId, carId);
  const attachmentUrl = currentCar.attachmentUrl;
  if (attachmentUrl) {
    await deleteAttachmentUrl(carId);
  }
  return await carAccess.deleteCar(userId, carId);
}

export async function createAttachmentPresignedUrl(carId: string) {
  return await createPresignUrl(carId);
}

export async function updatePresignedUrlForCar(userId: string, carId: string) {
  const attachmentUrl = createAttachmentUrl(carId);
  return await carAccess.updatePresignedUrlForCar(attachmentUrl, userId, carId);
}