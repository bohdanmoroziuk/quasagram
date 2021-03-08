<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
    >
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only"
          icon="eva-camera-outline"
          to="/camera"
          round
          dense
          flat
        />

        <q-separator
          class="large-screen-only"
          vertical
          spaced
        />

        <q-toolbar-title
          class="text-grand-hotel text-weight-bold"
        >
          Quasagram
        </q-toolbar-title>

        <q-btn
          class="large-screen-only"
          icon="eva-home-outline"
          to="/"
          dense
          round
          flat
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="small-screen-only bg-white"
      bordered
    >
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/"
          icon="eva-home-outline"
          exact
        />
        <q-route-tab
          to="/camera"
          icon="eva-camera-outline"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style lang="sass" scoped>
.q-toolbar__title
  font-size: 1.5rem

  @media(max-width: $breakpoint-xs-max)
    text-align: center
</style>
