const axios = require("axios");
const { baseUrl, pathFilms, pathPeople, pathPlanets, pathSpecies, pathVehicles, pathStarships } = require("../common/utils/constants");

const getTotalPaths = async () => {

  const response = await axios.get(baseUrl);
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalPeople = async () => {

  const response = await axios.get(
    `${baseUrl}${pathPeople}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalPlanets = async () => {

  const response = await axios.get(
    `${baseUrl}${pathPlanets}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalFilms = async () => {

  const response = await axios.get(
    `${baseUrl}${pathFilms}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalSpecies = async () => {

  const response = await axios.get(
    `${baseUrl}${pathSpecies}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalVehicles = async () => {

  const response = await axios.get(
    `${baseUrl}${pathVehicles}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};

const getTotalStarships = async () => {

  const response = await axios.get(
    `${baseUrl}${pathStarships}`
  );
  const data = response.data;
  return {
    status: 200,
    body: JSON.stringify(data),
  };
};


module.exports = {
  getTotalPaths,
  getTotalPeople,
  getTotalPlanets,
  getTotalFilms,
  getTotalSpecies,
  getTotalVehicles,
  getTotalStarships
};
