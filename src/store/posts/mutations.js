export const getPostsRequest = (state) => {
  state.loading = true;
};

export const getPostsSuccess = (state, posts) => {
  state.loading = false;
  state.posts = posts;
};

export const getPostsFailure = (state) => {
  state.loading = false;
  state.posts = [];
};
