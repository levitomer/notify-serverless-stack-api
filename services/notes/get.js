import handler from './libs/handler-lib';
import dynamodb from './libs/dynamodb-lib';

// Get a specific note for a given user id
export const main = handler(async (event, context) => {
    const params = {
        TableName:process.env.tableName,
        // Defines the partition key and sort key of the item to be retrieved
        Key: {
            // Identity Pool identity id of the authenticated user
            userId: event.requestContext.identity.cognitoIdentityId,
            // Path parameter
            noteId: event.pathParameters.id
        }
    };

    const result = await dynamodb.get(params);

    if (!result) {
        throw new Error("Item not found.");
    }

    return result.Item;
});