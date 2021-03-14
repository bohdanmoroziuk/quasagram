<template>
  <q-page>
    <div class="constrain1 q-pa-md">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-sm-8">
          <post-card-skeleton v-if="arePostsLoading" />
          <template v-else-if="hasPosts">
            <post-card
              v-for="post of posts"
              :key="post.id"
              :post="post"
              class="q-mb-md"
            />
          </template>
          <h5 v-else class="text-center text-grey">
            No posts yet.
          </h5>
        </div>
        <div class="col-4 large-screen-only">
          <div class="fixed">
            <profile-bar />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapState('posts', ['posts', 'arePostsLoading']),
    ...mapGetters('posts', ['hasPosts']),
  },
  methods: {
    ...mapActions('posts', ['getPosts']),
  },
  async created() {
    try {
      await this.getPosts();
    } catch {
      this.$q.dialog({
        title: 'Error',
        message: 'Could not download posts',
      });
    }
  },
  components: {
    PostCard: () => import('components/PostCard.vue'),
    ProfileBar: () => import('components/ProfileBar.vue'),
    PostCardSkeleton: () => import('components/PostCardSkeleton.vue'),
  },
};
</script>
