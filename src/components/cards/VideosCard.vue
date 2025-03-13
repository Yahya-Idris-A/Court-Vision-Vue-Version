<template>
  <router-link
    :to="detailAnalysisUrl"
    class="flex flex-row max-sm:flex-col gap-[20px] px-[8px] py-[10px] w-full rounded-[10px] bg-white stroke-[#667085] shadow cursor-pointer"
  >
    <div class="flex max-w-[20%] max-sm:max-w-full w-full">
      <img
        :src="thumbnail"
        alt=""
        class="object-cover w-[220px] max-sm:w-full h-[120px] max-sm:h-full"
      />
    </div>
    <div class="flex flex-col w-full gap-[5px] justify-center">
      <div class="flex flex-col w-full gap-[5px]">
        <div class="flex flex-row justify-between gap-[10px] items-end">
          <div class="flex flex-col w-full gap-[1px]">
            <h2 class="text-black text-[20px] font-semibold">
              {{ title }}
            </h2>
            <p class="text-[15px] text-[#ADADAD] font-semibold">{{ date }}</p>
          </div>
          <p class="text-[15px] text-black font-semibold">
            {{ uploadProgress }}%
          </p>
        </div>
        <div
          class="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[20px]"
        >
          <div
            class="progress-fill w-[50%]"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
      </div>
      <div class="flex flex-row justify-start gap-[5px]">
        <v-progress-circular
          v-if="uploadProgress != 100"
          indeterminate
          color="#FD6A2A"
          size="22"
        ></v-progress-circular>
        <v-icon
          v-if="uploadProgress == 100"
          icon="mdi mdi-check-circle"
          class="!text-[22px] !text-[#FD6A2A] max-sm:!text-[20px]"
        ></v-icon>
        <p
          v-if="uploadProgress != 100"
          class="text-[15px] text-black font-normal"
        >
          {{ loadingText }}
        </p>
        <p
          v-if="uploadProgress == 100"
          class="text-[15px] text-black font-normal"
        >
          Completed
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const loadingStep = ref(0);
let loadingInterval = null;
const props = defineProps({
  thumbnail: String,
  title: String,
  date: String,
  uploadProgress: Number,
  detailAnalysisUrl: String,
});

const loadingText = computed(() => {
  const dots = ["", ".", "..", "..."];
  return `Analyzing${dots[loadingStep.value]}`;
});

onMounted(() => {
  loadingInterval = setInterval(() => {
    loadingStep.value = (loadingStep.value + 1) % 4;
  }, 500);
});

// Hentikan animasi jika komponen di-unmount
onUnmounted(() => {
  if (loadingInterval) {
    clearInterval(loadingInterval);
  }
});
</script>

<style scoped>
.progress-fill {
  height: 100%;
  background-color: #403d91;
  transition: width 0.3s ease;
}
</style>
