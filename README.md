# capstone-project

Functions to be implemented
To implement this project, you need to implement the following functions and configure them in the serverless.yml file:

Auth - this function should implement a custom authorizer for API Gateway that should be added to all other functions.

GetCars - should return all Cars for a current user. A user id can be extracted from a JWT token that is sent by the frontend
It should return data that looks like this:

{
  "items": [
    {
      "CarId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Buy milk",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": false,
      "attachmentUrl": "http://example.com/image.png"
    },
    {
      "CarId": "456",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Send a letter",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": true,
      "attachmentUrl": "http://example.com/image.png"
    },
  ]
}




CreateCar - should create a new Car for a current user. A shape of data send by a client application to this function can be found in the CreateCarRequest.ts file
It receives a new Car item to be created in JSON format that looks like this:

{
  "createdAt": "2019-07-27T20:01:45.424Z",
  "name": "Buy milk",
  "dueDate": "2019-07-29T20:01:45.424Z",
  "done": false,
  "attachmentUrl": "http://example.com/image.png"
}
It should return a new Car item that looks like this:

{
  "item": {
    "CarId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "name": "Buy milk",
    "dueDate": "2019-07-29T20:01:45.424Z",
    "done": false,
    "attachmentUrl": "http://example.com/image.png"
  }
}




UpdateCar - should update a Car item created by a current user. A shape of data send by a client application to this function can be found in the UpdateCarRequest.ts file
It receives an object that contains three fields that can be updated in a Car item:

{
  "name": "Buy bread",
  "dueDate": "2019-07-29T20:01:45.424Z",
  "done": true
}
The id of an item that should be updated is passed as a URL parameter.
It should return an empty body.





DeleteCar - Should delete a Car item created by a current user 
           - Delete S3 bucket object belong to this Car item (if exist). Expects an id of a Car item to remove.
It should return an empty body.





GenerateUploadUrl - returns a pre-signed URL that can be used to upload an attachment file for a Car item.
It should return a JSON object that looks like this:

{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

You also need to add any necessary resources to the resources section of the serverless.yml file such as DynamoDB table and S3 bucket.