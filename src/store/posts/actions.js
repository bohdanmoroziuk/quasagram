import * as PostsService from 'src/services/posts';

export const getPosts = async ({ commit }) => {
  try {
    commit('getPostsRequest');

    const posts = await PostsService.getPosts();

    commit('getPostsSuccess', posts);
  } catch (error) {
    commit('getPostsFailure');
    throw error;
  }
};

export const createPost = async ({ commit }, data) => {
  try {
    commit('createPostRequest');

    await PostsService.createPost(data);

    commit('createPostSuccess');
  } catch (error) {
    commit('createPostFailure');
    throw error;
  }
};
