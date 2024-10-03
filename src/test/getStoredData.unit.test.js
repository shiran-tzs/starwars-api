const { getStoredCharacters } = require("../functions/getStoredData");
const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");
AWS.config.update({ region: 'us-east-1' });

describe("getStoredCharacters", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("return characters", async () => {
    const testData = {
      Items: [
        {
          id: "7aec205d-cd73-4308-8ae3-5ff3da007f44",
          nombre: "Obi-Wan Kenobi",
          genero: "Masculino",
          universo_ficticio: "Universo expandido",
          color_ojos: "Azul grisáceo",
          color_pelo: "Castaño rojizo/Blanco",
          enemigo: "Darth Vader",
          creador: "George Lucas"
        }
      ]
    };

    awsMock.mock("DynamoDB.DocumentClient", "scan", (params, callback) => {
      callback(null, testData);
    });

    const event = {};
    const response = await getStoredCharacters(event);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ totalCharacters: testData.Items });
  });
});
