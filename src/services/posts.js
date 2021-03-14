import axios from 'axios';

const requestUrl = `${process.env.API}/posts`;

export const getPosts = async () => {
  const response = await axios.get(requestUrl);
  return response.data;
};

export const createPost = async (data) => {
  await axios.post(requestUrl, data);
};
