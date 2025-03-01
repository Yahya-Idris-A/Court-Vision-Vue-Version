<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow w-full rounded-[16px]"
  >
    <div
      class="flex flex-row justify-between w-full py-[10px] max-sm:py-[8px] px-[32px] max-sm:px-[24px]"
    >
      <p class="text-black font-semibold text-[24px] max-sm:text-[16px]">
        {{ question }}
      </p>
      <v-icon
        :icon="
          isAnswerOpen
            ? 'mdi mdi-minus-circle-outline'
            : 'mdi mdi-plus-circle-outline'
        "
        class="!text-[40px] max-sm:!text-[24px] cursor-pointer"
        @click="onToggleQuestion"
      ></v-icon>
    </div>
    <div :class="isAnswerOpen ? 'flex flex-row w-full' : 'hidden'">
      <v-divider
        vertical
        :thickness="2"
        class="pl-[32px] max-sm:pl-[24px] !text-[#38347A] !my-[10px]"
      ></v-divider>
      <p
        class="pl-[10px] pr-[32px] max-sm:pr-[24px] py-[10px] max-sm:py-[8px] text-[#667085] font-semibold text-[13px] max-sm:text-[10px]"
      >
        {{ answer }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isAnswerOpen = ref(false);

const onToggleQuestion = () => {
  isAnswerOpen.value = !isAnswerOpen.value;
};

const props = defineProps({
  question: String,
  answer: String,
});
</script>
