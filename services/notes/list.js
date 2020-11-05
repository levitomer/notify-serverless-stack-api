import handler from './libs/handler-lib';
import dynamodb from './libs/dynamodb-lib';

// Query a list of all notes for a given user id
export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // KeyConditionExpression defines the condition for the query
        // - "userId = :userId" only return items with matching 'userId' partition key
        KeyConditionExpression: "userId = :userId",
        // ExpressionAttributeValues defines the value in the above condition
        ExpressionAttributeValues: {
            // Defines the 'userId' to be Identity Pool identity id of the authenticated user
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    const result = await dynamodb.query(params);

    return result.Items;
});