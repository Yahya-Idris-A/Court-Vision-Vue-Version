<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow w-fit rounded-[16px]"
  >
    <img :src="cover" alt="" class="px-[32px] pt-[32px]" />
    <h3 class="text-[24px] font-semibold text-[#667085] pt-[15px]">
      {{ heading }}
    </h3>
    <p class="text-[13px] font-semibold text-[#667085] pb-[15px]">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  cover: String,
  heading: String,
  description: String,
});
</script>
