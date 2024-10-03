const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({ region: 'us-east-1' });

module.exports.postNewCharacter = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { nombre, genero, universo_ficticio, color_ojos, color_pelo, enemigo, creador } = JSON.parse(event.body);
  const id = uuidv4();

  const newCharacter = { nombre, genero, universo_ficticio, color_ojos, color_pelo, enemigo, creador, id };

  await dynamodb
    .put({
      TableName: 'StarWarsCharacters',
      Item: newCharacter,
    })
    .promise();

  return {
    status: 200,
    mensaje: 'Personaje registrado correctamente!',
    data: newCharacter,
  };
};

