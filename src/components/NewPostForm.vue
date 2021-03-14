<template>
  <form
    class="new-post-form"
    @submit.prevent="$emit('submit', post)"
  >
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        class="full-width"
        autoplay
        playsinline
        ref="video"
      />
      <canvas
        v-show="imageCaptured"
        class="full-width"
        height="240"
        ref="canvas"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        :disable="imageCaptured"
        round
        size="lg"
        color="grey-10"
        icon="eva-camera"
        @click="captureImage"
      />
      <q-file
        v-else
        dense
        accept="image/*"
        v-model="imageFile"
        label="Choose an image"
        @input="captureImageFallback"
      >
        <template #prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="caption"
        label="Caption *"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="location"
        :loading="isLocationLoading"
        label="Location"
        dense
      >
        <template #append>
          <q-btn
            v-if="hasGeolocationSupport && !isLocationLoading"
            round
            dense
            flat
            icon="eva-navigation-2-outline"
            @click="getLocation"
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
        type="submit"
        :disable="!photo || !caption"
      />
    </div>
  </form>
</template>

<script>
/* eslint-disable no-console */

import { uid } from 'quasar';

import { getLocationDetails } from 'src/services/geocode';

export default {
  name: 'NewPostForm',
  data() {
    return {
      caption: '',
      location: '',
      photo: null,
      imageFile: [],
      imageCaptured: false,
      hasCameraSupport: true,
      isLocationLoading: false,
      hasGeolocationSupport: ('geolocation' in navigator),
    };
  },
  computed: {
    post() {
      const { caption, location, photo } = this;
      const formData = new FormData();
      const id = uid();

      formData.append('id', id);
      formData.append('caption', caption);
      formData.append('location', location);
      formData.append('createdAt', Date.now());
      formData.append('file', photo, id.concat('.png'));

      return formData;
    },
  },
  methods: {
    initializeCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch(() => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      const { video, canvas } = this.$refs;
      const { width, height } = video.getBoundingClientRect();

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, width, height);

      this.imageCaptured = true;
      this.photo = this.dataURItoBlob(canvas.toDataURL());

      this.disableCamera();
    },
    captureImageFallback(file) {
      this.photo = file;
      this.uploadImageIntoCanvas(file, this.$refs.canvas);
    },
    uploadImageIntoCanvas(file, canvas) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();

        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext('2d').drawImage(image, 0, 0);

          this.imageCaptured = true;
        };

        image.src = event.target.result;
      };

      reader.readAsDataURL(file);
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      const ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      const blob = new Blob([ab], { type: mimeString });

      return blob;
    },
    disableCamera() {
      const stopTrack = (track) => track.stop();

      this.$refs.video.srcObject
        .getVideoTracks()
        .forEach(stopTrack);
    },
    getLocation() {
      navigator.geolocation
        .getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          this.isLocationLoading = true;

          getLocationDetails(latitude, longitude)
            .then((data) => [data.city, data.country].join(', '))
            .then((location) => { this.location = location; })
            .catch((error) => { this.reportError(error); })
            .finally(() => { this.isLocationLoading = false; });
        }, (error) => {
          this.reportError(error);
          this.isLocationLoading = false;
        }, {
          timeout: 7000,
        });
    },
    reportError(error) {
      this.$q.dialog({
        title: 'Error',
        message: error.message,
      });
    },
  },
  mounted() {
    this.initializeCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
};
</script>

<style lang="sass" scoped>
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
