<template>
  <div
    class="flex flex-col items-center justify-start w-full p-[20px] gap-[20px] bg-white stroke-[#667085] shadow"
  >
    <!-- Team Name -->
    <div class="flex flex-row gap-[50px] justify-center items-center">
      <div class="flex flex-row items-center justify-end w-[300px]">
        <!-- <h3 class="text-[24px] text-[#4B465C] font-semibold">
            Oklahoma City Thunder
          </h3> -->
        <img src="@assets/img/team/Home.png" alt="" class="size-[120px]" />
      </div>
      <h1 class="text-[36px] text-[#4B465C] font-semibold">VS</h1>
      <div class="flex flex-row items-center justify-start w-[300px]">
        <img src="@assets/img/team/Away.png" alt="" class="size-[120px]" />
        <!-- <h3 class="text-[24px] text-[#4B465C] font-semibold">
            Cleveland Cavaliers
          </h3> -->
      </div>
    </div>
    <!-- Total Shots -->
    <div class="flex flex-col w-full justify-center items-center">
      <div class="flex flex-row justify-between w-full">
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
        <h1 class="text-[36px] text-[#4B465C] font-semibold">Total Shots</h1>
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
      </div>
      <div class="overflow-hidden rounded-[10px] bg-[#403D91] h-[20px] w-full">
        <div
          class="progress-fill w-[50%]"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
    <!-- 3 Pointers -->
    <div class="flex flex-col w-full justify-center items-center">
      <div class="flex flex-row justify-between w-full">
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
        <h1 class="text-[36px] text-[#4B465C] font-semibold">3 Pointers</h1>
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
      </div>
      <div class="overflow-hidden rounded-[10px] bg-[#403D91] h-[20px] w-full">
        <div
          class="progress-fill w-[50%]"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
    <!-- 2 Pointers -->
    <div class="flex flex-col w-full justify-center items-center">
      <div class="flex flex-row justify-between w-full">
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
        <h1 class="text-[36px] text-[#4B465C] font-semibold">2 Pointers</h1>
        <p class="text-[36px] text-[#4B465C] font-semibold">10</p>
      </div>
      <div class="overflow-hidden rounded-[10px] bg-[#403D91] h-[20px] w-full">
        <div
          class="progress-fill w-[50%]"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.progress-fill {
  height: 100%;
  background-color: #fd6a2a;
  transition: width 0.3s ease;
}
</style>
