<template>
  <div
    class="w-[60%] max-xl:w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg"
  >
    <!-- Thumbnail & Video -->
    <div class="relative group cursor-pointer" @click="playVideo">
      <img
        v-if="!isPlaying"
        :src="thumbnail"
        class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        alt="Video Thumbnail"
      />
      <video
        v-if="isPlaying"
        ref="videoPlayer"
        :src="videoSrc"
        class="w-full h-full object-cover"
        controls
      ></video>

      <!-- Play Button -->
      <div
        v-if="!isPlaying"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <v-icon
          icon="mdi mdi-play"
          class="!text-[70px] !text-[#FD6A2A] max-sm:!text-[20px]"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  thumbnail: String,
  videoSrc: String,
});

const isPlaying = ref(false);
const videoPlayer = ref(null);

const playVideo = () => {
  isPlaying.value = true;
  setTimeout(() => {
    videoPlayer.value.play();
  }, 100);
};
</script>
