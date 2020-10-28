import handler from './libs/handler-lib';
import dynamodb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // Key defines the partition key and sort key of the item to be updated
        Key: {
            // Identity Pool identity id of the authenticated user
            userId: event.requestContext.identity.cognitoIdentityId,
            // Path parameter
            noteId: event.pathParameters.id
        },
        // UpdateExpression defines the attributes to be updated
        UpdateExpression: "SET content = :content, attachment = :attachment",
        // ExpressionAttributeValues defines the values in UpdateExpression
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        // ReturnValues specifies if and how to return the item's attributes.
        // where ALL_NEW returns all attributes of the item after the update;
        ReturnValues: "ALL_NEW"
    };

    await dynamodb.update(params);

    return { status: true };
});