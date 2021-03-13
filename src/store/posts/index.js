import state from 'src/store/posts/state';
import * as getters from 'src/store/posts/getters';
import * as mutations from 'src/store/posts/mutations';
import * as actions from 'src/store/posts/actions';

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
};
