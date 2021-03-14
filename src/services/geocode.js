import axios from 'axios';

export const getLocationDetails = async (latitude, longitude) => {
  const requestUrl = `https://geocode.xyz/${latitude},${longitude}?geoit=JSON`;
  const response = await axios.get(requestUrl);

  return response.data;
};
