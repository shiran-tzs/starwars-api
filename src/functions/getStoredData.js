const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getStoredCharacters = async (event) => {

  const result = await dynamodb.scan({ TableName: "StarWarsCharacters" }).promise();

  const totalCharacters = result.Items;

  return {
    status: 200,
    body: { totalCharacters },
  };
};
