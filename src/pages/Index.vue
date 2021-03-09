<template>
  <q-page>
    <div class="constrain q-pa-md">
      <div class="row q-col-gutter-lg">
        <div class="col-8">
          <div>
            <post-card
              v-for="post of posts"
              :key="post.id"
              :post="post"
              class="q-mb-md"
            />
          </div>
        </div>
        <div class="col-4">
          <div class="fixed">
            <profile-bar />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      posts: [],
    };
  },
  components: {
    PostCard: () => import('components/PostCard.vue'),
    ProfileBar: () => import('components/ProfileBar.vue'),
  },
};
</script>
