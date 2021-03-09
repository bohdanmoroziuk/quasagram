<template>
  <q-card class="post-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-weight-bold">
          jordan_wild
        </q-item-label>
        <q-item-label caption>
          {{ post.location }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img
      style="min-height: 200px"
      :src="post.imageUrl"
    />

    <q-card-section>
      <div>{{ post.caption }}</div>
      <div class="text-caption text-grey">
        {{ post.createdAt | date }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  filters: {
    date(value) {
      return date.formatDate(value, 'MMMM D h:mmA');
    },
  },
};
</script>
