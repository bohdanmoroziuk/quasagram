<template>
  <q-page>
    <div class="constrain2 q-pa-md">
      <new-post-form
        :loading="isPostCreating"
        @submit="onSubmit"
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

    async onSubmit(data) {
      try {
        await this.createPost(data);

        this.$router.push('/').catch(() => {});
        this.$q.notify({
          message: 'Post created',
          actions: [
            { label: 'Dismiss', color: 'white' },
          ],
        });
      } catch (error) {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not create post!',
        });
      }
    },
  },
  components: {
    NewPostForm: () => import('components/NewPostForm.vue'),
  },
};
</script>
