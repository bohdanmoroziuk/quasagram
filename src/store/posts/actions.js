import axios from 'axios';

export const getPosts = async ({ commit }) => {
  try {
    commit('getPostsRequest');

    const response = await axios.get(`${process.env.API}/posts`);

    commit('getPostsSuccess', response.data);
  } catch (error) {
    commit('getPostsFailure');
    throw error;
  }
};

export const createPost = async ({ commit }, data) => {
  try {
    commit('createPostRequest');

    await axios.post(`${process.env.API}/posts`, data);

    commit('createPostSuccess');
  } catch (error) {
    commit('createPostFailure');
    throw error;
  }
};
