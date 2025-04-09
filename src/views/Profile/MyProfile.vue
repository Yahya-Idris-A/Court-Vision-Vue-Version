<template>
  <div
    class="flex flex-col items-center gap-[10px] w-full mt-[32px] mr-[20px] max-sm:mt-[16px]"
  >
    <!-- Header -->
    <div
      class="flex flex-row items-center justify-start w-full p-[20px] bg-white stroke-[#667085] shadow"
    >
      <p class="text-[18px] text-[#4B465C] font-semibold">My Profile</p>
    </div>
    <!-- Form -->
    <div
      class="flex flex-col items-center justify-start w-full p-[32px] bg-white stroke-[#667085] shadow"
    >
      <FormProfile />
    </div>
  </div>
</template>
<script setup>
import FormProfile from "../../components/partials/FormProfile.vue";
</script>
<style scoped></style>
