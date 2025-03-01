<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow w-full rounded-[16px]"
  >
    <div class="flex flex-row items-center py-[32px] max-sm:py-[16px] pl-[32px] w-full">
        <img :src="profileImg" alt="" class="size-[100px] max-sm:size-[80px]">
        </img>
        <div class="flex flex-col pl-[24px] max-sm:pl-[16px]">
            <h3 class="text-black text-[24px] max-sm:text-[20px] font-semibold">{{ username }}</h3>
            <p class="text-[#667085] text-[15px] max-sm:text-[11px] font-semibold">{{ position }}</p>
            <div class="flex flex-row items-center">
                <img :src="teamImg" alt="" class="size-[50px] max-sm:size-[30px]">
                <p class="text-[#667085] text-[15px] max-sm:text-[11px] font-semibold">{{ teamName }}</p>
            </div>
        </div>
    </div>
    <div class="flex flex-row">
        <v-divider vertical :thickness="2" class="pl-[32px] !text-[#38347A] !my-[5%]"></v-divider>
        <p class="pl-[10px] pr-[32px] py-[45.34px] max-sm:py-[16px] text-[13px] max-sm:text-[9px] font-semibold text-[#667085]">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  profileImg: String,
  username: String,
  position: String,
  teamImg: String,
  teamName: String,
  message: String,
});
</script>
