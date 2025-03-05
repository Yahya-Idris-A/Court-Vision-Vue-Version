<template>
  <div
    class="flex flex-col items-center gap-[10px] w-full mt-[32px] max-sm:mt-[16px]"
  >
    <!-- Header -->
    <div
      class="flex flex-row items-center justify-start w-full p-[20px] bg-white stroke-[#667085] shadow"
    >
      <p class="text-[18px] text-[#4B465C] font-semibold">Detailed Analysis</p>
    </div>
    <VideoPlayer :thumbnail="thumbnail" :video-src="videoSrc" />
    <!-- Stats -->
    <TeamsStats />
    <!-- Event Map -->
    <EventMap />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import VideoPlayer from "../../components/partials/VideoPlayer.vue";
import TeamsStats from "../../components/partials/TeamsStats.vue";
import EventMap from "@components/partials/EventMap.vue";
import thumbnail from "@assets/img/thumb/thumbnail.jpg";
import videoSrc from "@assets/video/Es Teh Manis - 1 minute short movie.mp4";
</script>
<style scoped></style>
