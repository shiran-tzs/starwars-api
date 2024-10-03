const AWS = require('aws-sdk');
const axios = require("axios");
const { baseUrl, pathPeople } = require('../common/utils/constants');

module.exports.getTranslate = async (event) => {

  try {
    const response = await axios.get(
      `${baseUrl}${pathPeople}1`
    );
    const data = response.data;
    const translate = new AWS.Translate();

    const keysList = {
      name: "nombre",
      height: "altura",
      mass: "masa",
      hair_color: "color_cabello",
      skin_color: "color_piel",
      eye_color: "color_ojos",
      birth_year: "año_nacimiento",
      gender: "genero",
      homeworld: "planeta_natal",
      films: "peliculas",
      species: "especies",
      vehicles: "vehiculos",
      starships: "naves_espaciales",
      created: "creado",
      edited: "editado",
      url: "enlace",
    };

    const translatedData = {};
    for (const key in data) {
      try {
        let translatedkey = keysList.hasOwnProperty(key) ? keysList[key] : key;
        console.log('translatedkey', translatedkey);

        const params = {
          SourceLanguageCode: 'auto',
          TargetLanguageCode: 'es',
          Text: data[key],
        };
        const translationResponse = await translate.translateText(params).promise();
        translatedData[translatedkey] = translationResponse.TranslatedText;
      } catch (error) {
        console.error("Error al traducir keys:", error);
        translatedData[key] = data[key];
      }
    }

    return {
      status: 200,
      body: JSON.stringify(translatedData),
    };
  } catch (error) {
    console.error("Error al obtener datos de la API de Star Wars:", error);
    return {
      status: 500,
      body: JSON.stringify({
        message: "Error al obtener datos de la API de Star Wars"
      }),
    };
  }
};
