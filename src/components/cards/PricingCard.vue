<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow max-w-[26.6%] rounded-[16px]"
  >
    <v-icon
      :icon="pricingIcon"
      class="!text-[40px] text-[#FD6A2A] !mt-[24px] !mb-[14px]"
    ></v-icon>
    <h3 class="text-[24px] text-black font-semibold mb-[14px]">
      {{ pricingType }}
    </h3>
    <h4 class="text-[16px] text-black font-semibold mb-[14px]">{{ cost }}</h4>
    <h4 class="text-[14px] text-black font-semibold mb-[14px]">
      {{ billMethod }}
    </h4>
    <div class="flex flex-col items-start p-[32px] justify-items-center">
      <div v-for="(item, index) in benefit" :key="index">
        <p
          v-if="item != null"
          class="text-[#667085] text-[16px] font-normal mb-[16px]"
        >
          <v-icon
            icon="mdi mdi-check-circle-outline"
            class="!text-[24px] text-[#FD6A2A] !mr-[12px]"
          ></v-icon
          >{{ item }}
        </p>
      </div>
    </div>
    <button
      class="text-[16px] text-white font-semibold bg-[#FD6A2A] px-[120.5px] py-[12px] rounded-[8px] cursor-pointer mb-[32px]"
    >
      Subscribe
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  pricingIcon: String,
  pricingType: String,
  cost: String,
  billMethod: String,
  benefit: Array,
});
</script>
