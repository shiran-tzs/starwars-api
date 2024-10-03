const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");
const { postNewCharacter } = require("../functions/postCharacter");

describe("newCharacter", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("new character", async () => {
    const mockData = {
      body: JSON.stringify({
        nombre: "Leia Organa de Alderaan",
        genero: "Femenino",
        universo_ficticio: "Univserso expandido",
        color_ojos: "Castaño",
        color_pelo: "Marrón",
        enemigo: "Ninguno",
        creador: "George Lucas"
      }),
    };

    awsMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {});
    });

    const response = await postNewCharacter(mockData);

    expect(response.status).toBe(200);
    expect(response.mensaje).toBe("Personaje registrado correctamente!");
    expect(response.data).toEqual({
      id: expect.any(String),
      ...JSON.parse(mockData.body),
    });
  });
});
