<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow w-fit rounded-[16px]"
  >
    <img
      :src="cover"
      alt=""
      class="px-[32px] pt-[32px] max-sm:px-[12px] max-sm:pt-[12px] max-xl:px-[20px] max-xl:pt-[20px]"
    />
    <h3
      class="text-[24px] font-semibold text-[#667085] pt-[15px] max-sm:text-[12px] max-sm:pt-[6px] max-xl:text-[16px] max-xl:pt-[10px]"
    >
      {{ heading }}
    </h3>
    <p
      class="text-[13px] font-semibold text-[#667085] pb-[15px] max-sm:text-[6px] max-sm:pb-[6px] max-xl:text-[10px] max-xl:pb-[10px]"
    >
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
