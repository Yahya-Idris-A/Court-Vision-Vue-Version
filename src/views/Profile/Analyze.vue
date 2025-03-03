<template>
  <div
    class="flex flex-col items-center gap-[10px] w-full mt-[32px] max-sm:mt-[16px]"
  >
    <!-- Header -->
    <div
      class="flex flex-row items-center justify-start w-full p-[20px] bg-white stroke-[#667085] shadow"
    >
      <p class="text-[18px] text-[#4B465C] font-semibold">Analyze Your Video</p>
    </div>
    <!-- Form -->
    <div
      class="flex flex-col items-center justify-start w-full p-[32px] bg-white stroke-[#667085] shadow"
    >
      <FormAnalyze />
    </div>
  </div>
</template>

<script setup>
import FormAnalyze from "@components/partials/FormAnalyze.vue";
</script>
<style scoped></style>
