<template>
  <router-link
    :to="detailAnalysisUrl"
    class="flex flex-row max-sm:flex-col gap-[20px] px-[8px] py-[10px] w-full rounded-[10px] bg-white stroke-[#667085] shadow cursor-pointer"
  >
    <div class="flex max-w-[250px] max-sm:max-w-full w-full">
      <img
        :src="thumbnail"
        alt=""
        class="object-cover w-[250px] max-sm:w-full h-[120px] max-sm:h-full"
      />
    </div>
    <div class="flex flex-col w-full gap-[5px] justify-center">
      <div
        v-if="props.uploadStatus == 'waiting'"
        class="flex flex-col w-full gap-[5px]"
      >
        <div class="flex flex-row justify-between gap-[10px] items-end">
          <div class="flex flex-col w-full gap-[1px]">
            <h2 class="text-black text-[20px] font-semibold">
              {{ title }}
            </h2>
            <p class="text-[15px] text-[#ADADAD] font-semibold">{{ date }}</p>
          </div>
          <p class="text-[15px] text-black font-semibold">0%</p>
        </div>
        <div
          className="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[20px] relative bg-white"
        >
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-[#403D91] animate-pulse-indeterminate"
          ></div>
        </div>
      </div>
      <div
        v-if="props.uploadStatus == 'processing'"
        class="flex flex-col w-full gap-[5px]"
      >
        <div class="flex flex-row justify-between gap-[10px] items-end">
          <div class="flex flex-col w-full gap-[1px]">
            <h2 class="text-black text-[20px] font-semibold">
              {{ title }}
            </h2>
            <p class="text-[15px] text-[#ADADAD] font-semibold">{{ date }}</p>
          </div>
          <p
            v-if="props.uploadProgress == null"
            class="text-[15px] text-black font-semibold"
          >
            0%
          </p>
          <p
            v-if="props.uploadProgress != null"
            class="text-[15px] text-black font-semibold"
          >
            {{ uploadProgress }}%
          </p>
        </div>
        <div
          v-if="props.uploadProgress != null"
          class="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[20px]"
        >
          <div
            class="progress-fill w-[50%]"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
        <div
          v-if="props.uploadProgress == null"
          className="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[20px] relative bg-white"
        >
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-[#403D91] animate-pulse-indeterminate"
          ></div>
        </div>
      </div>
      <div
        v-if="props.uploadStatus == 'completed'"
        class="flex flex-col w-full gap-[5px]"
      >
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
      <div
        v-if="props.uploadStatus == 'failed'"
        class="flex flex-col w-full gap-[5px]"
      >
        <div class="flex flex-row justify-between gap-[10px] items-end">
          <div class="flex flex-col w-full gap-[1px]">
            <h2 class="text-black text-[20px] font-semibold">
              {{ title }}
            </h2>
            <p class="text-[15px] text-[#ADADAD] font-semibold">{{ date }}</p>
          </div>
          <p class="text-[15px] text-black font-semibold">0%</p>
        </div>
        <div
          class="overflow-hidden rounded-[10px] border-[1px] border-[#403D91] h-[20px]"
        >
          <div class="progress-fill w-[50%]" :style="{ width: `0%` }"></div>
        </div>
      </div>
      <div
        v-if="
          props.uploadStatus == 'waiting' ||
          props.uploadStatus == 'processing' ||
          props.uploadStatus == 'completed'
        "
        class="flex flex-row justify-start gap-[5px]"
      >
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
          {{ props.uploadStatus }}
        </p>
      </div>
      <div
        v-if="props.uploadStatus == 'failed'"
        class="flex flex-row justify-start items-center gap-[5px]"
      >
        <v-icon
          icon="mdi mdi-close-circle"
          class="!text-[22px] !text-[#FD6A2A] max-sm:!text-[20px]"
        ></v-icon>
        <p class="text-[15px] text-black font-normal">
          {{ props.uploadStatus }}
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
  uploadStatus: String,
  detailAnalysisUrl: String,
});

const loadingText = computed(() => {
  const dots = ["", ".", "..", "..."];
  return `${props.uploadStatus}${dots[loadingStep.value]}`;
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

/* Animasi Progress Bar */
@keyframes indeterminate {
  0% {
    left: -33%;
    width: 33%;
  }
  50% {
    left: 33%;
    width: 33%;
  }
  100% {
    left: 100%;
    width: 33%;
  }
}

.animate-pulse-indeterminate {
  animation: indeterminate 1.2s infinite ease-in-out;
}
</style>
