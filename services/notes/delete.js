import handler from './libs/handler-lib';
import dynamodb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {

    const params = {
        TableName: process.env.tableName,
        // Key defines the partition key and sort key of the item to be removed
        Key: {
            // Identity Pool identity id of the authenticated user
            userId: event.requestContext.identity.cognitoIdentityId,
            // Path parameter
            noteId: event.pathParameters.id
        }
    };

    await dynamodb.delete(params);

    return { status: true };
});