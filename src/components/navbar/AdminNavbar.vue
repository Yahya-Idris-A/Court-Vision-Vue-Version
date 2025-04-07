<template>
  <div
    class="flex flex-row items-center justify-end max-sm:justify-center bg-white stroke-[#667085] shadow gap-[8px] w-full rounded-[6px]"
  >
    <img
      src="@assets/img/user/Avatar.png"
      alt=""
      class="size-[50px] my-[6px]"
    />
    <p
      class="text-[15px] text-[#4B465C] font-normal ml-[8px] mr-[32px] max-sm:mr-0"
    >
      {{ userData.user?.name || "Loading..." }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import * as authService from "@/services/authService";

const userData = ref({});

const getUserData = async () => {
  const response = await authService.getUser();
  userData.value = response.data;
};

watchEffect(async () => {
  await getUserData();
});

onMounted(async () => {
  await getUserData();
});
</script>
<style scoped></style>
