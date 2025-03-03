<template>
  <div
    class="flex flex-col items-center justify-start w-full p-[20px] gap-[16px] bg-white stroke-[#667085] shadow"
  >
    <!-- Team Select -->
    <div class="flex flex-row gap-[50px] justify-center items-center">
      <button
        class="text-[32px] text-white font-semibold py-[10px] px-[40px] bg-[#FD6A2A] rounded-[40px]"
      >
        Team A
      </button>
      <button
        class="text-[32px] text-white font-semibold py-[10px] px-[40px] bg-[#FD6A2A] rounded-[40px]"
      >
        Team B
      </button>
    </div>
    <!-- Shotmap Header -->
    <div class="flex flex-row gap-[10px] justify-start items-center w-full">
      <v-icon
        icon="mdi mdi-basketball"
        class="!text-[30px] !text-[#667085] max-sm:!text-[30px]"
      ></v-icon>
      <p class="text-[15px] text-[#667085] font-semibold">Team Event Shotmap</p>
    </div>
    <!-- Shotmap -->
    <div class="flex flex-row gap-[30px] justify-start w-full">
      <ShotMap />
      <div class="flex flex-col gap-[20px] justify-start w-full">
        <h1>Team A</h1>
        <div class="flex flex-row gap-[10px] justify-start items-center w-full">
          <div class="flex flex-col gap-[10px] justify-start w-1/2">
            <v-checkbox
              class="text-black custom-checkbox"
              :ripple="false"
              density="compact"
              hide-details="auto"
            >
              <template v-slot:label>
                <span class="text-[14px] font-semibold !text-[#667085]"
                  >Player 1</span
                >
              </template>
            </v-checkbox>
          </div>
          <div class="flex flex-col gap-[10px] justify-start w-1/2">
            <v-checkbox
              class="text-black custom-checkbox"
              :ripple="false"
              density="compact"
              hide-details="auto"
            >
              <template v-slot:label>
                <span class="text-[14px] font-semibold !text-[#667085]"
                  >Player 9</span
                >
              </template>
            </v-checkbox>
          </div>
        </div>
      </div>
    </div>
    <!-- Heatmap Header -->
    <div class="flex flex-row gap-[10px] justify-start items-center w-full">
      <v-icon
        icon="mdi mdi-basketball"
        class="!text-[30px] !text-[#667085] max-sm:!text-[30px]"
      ></v-icon>
      <p class="text-[15px] text-[#667085] font-semibold">Team Event Heatmap</p>
    </div>
    <!-- Heatmap -->
    <HeatMap :width="840" :height="450" />
  </div>
</template>

<script setup>
import ShotMap from "./ShotMap.vue";
import HeatMap from "./HeatMap.vue";
</script>
