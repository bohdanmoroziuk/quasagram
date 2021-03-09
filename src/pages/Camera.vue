<template>
  <q-page>
    <div class="constrain2 q-pa-md">
      <new-post-form />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Camera',
  components: {
    NewPostForm: () => import('components/NewPostForm.vue'),
  },
};
</script>
