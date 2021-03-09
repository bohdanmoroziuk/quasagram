<template>
  <form
    class="new-post-form"
    @submit="$emit('submit', post)"
  >
    <div class="camera-frame q-pa-md">
      <img
        class="full-width"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        alt=""
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        round
        size="lg"
        color="grey-10"
        icon="eva-camera"
      />
    </div>
    <div class="row justify-content q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="caption"
        label="Caption"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="location"
        label="Location"
        dense
      >
        <template #append>
          <q-btn
            round
            dense
            flat
            icon="eva-navigation-2-outline"
          />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        unelevated
        rounded
        color="primary"
        label="Post image"
      />
    </div>
  </form>
</template>

<script>
import { uid } from 'quasar';

export default {
  name: 'NewPostForm',
  data() {
    return {
      caption: '',
      location: '',
    };
  },
  computed: {
    post() {
      const { caption, location } = this;

      return {
        id: uid(),
        caption,
        location,
        photo: null,
        createdAt: Date.now(),
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
