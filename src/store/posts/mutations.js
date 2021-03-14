export const getPostsRequest = (state) => {
  state.arePostsLoading = true;
};

export const getPostsSuccess = (state, posts) => {
  state.arePostsLoading = false;
  state.posts = posts;
};

export const getPostsFailure = (state) => {
  state.arePostsLoading = false;
  state.posts = [];
};

export const createPostRequest = (state) => {
  state.isPostCreating = true;
};

export const createPostSuccess = (state) => {
  state.isPostCreating = false;
};

export const createPostFailure = (state) => {
  state.isPostCreating = false;
};
