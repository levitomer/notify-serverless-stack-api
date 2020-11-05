import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

// Creates a note for a given user id
export const main = handler(async (event, context) => {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Item' contains the attributes of the item to be created
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        Item: {
            // - 'userId': user identities are federated through the
            userId: event.requestContext.identity.cognitoIdentityId,
            // - 'noteId': a unique uuid
            noteId: uuid.v1(),
            // - 'content': parsed from request body
            content: data.content,
            // - 'attachment': parsed from request body
            attachment: data.attachment,
            // - 'createdAt': current Unix timestamp
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});