<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow w-fit rounded-[16px] max-w-[43.33%]"
  >
    <div class="flex flex-row items-center py-[32px] pl-[32px] w-full">
        <img :src="profileImg" alt="" class="size-[100px]">
        </img>
        <div class="flex flex-col pl-[24px]">
            <h3 class="text-black text-[24px] font-semibold">{{ username }}</h3>
            <p class="text-[#667085] text-[15px] font-semibold">{{ position }}</p>
            <div class="flex flex-row items-center">
                <img :src="teamImg" alt="" class="size-[50px]">
                <p class="text-[#667085] text-[15px] font-semibold">{{ teamName }}</p>
            </div>
        </div>
    </div>
    <div class="flex flex-row">
        <v-divider vertical :thickness="2" class="pl-[32px] !text-[#38347A] !my-[5%]"></v-divider>
        <p class="pl-[10px] pr-[32px] py-[45.34px] text-[13px] font-semibold text-[#667085]">{{ message }}</p>
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
