<template>
  <q-page>
    <div class="constrain2 q-pa-md">
      <new-post-form
        :loading="isPostCreating"
        @submit="createPost"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Camera',
  computed: {
    ...mapState('posts', ['isPostCreating']),
  },
  methods: {
    ...mapActions('posts', ['createPost']),
  },
  components: {
    NewPostForm: () => import('components/NewPostForm.vue'),
  },
};
</script>
