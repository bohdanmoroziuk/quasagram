import axios from 'axios';

export const getPosts = async ({ commit }) => {
  try {
    commit('getPostsRequest');

    const response = await axios.get('http://localhost:3000/posts');

    commit('getPostsSuccess', response.data);
  } catch (error) {
    commit('getPostsFailure');
    throw error;
  }
};
