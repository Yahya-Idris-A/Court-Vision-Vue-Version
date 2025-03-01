<template>
  <div
    class="flex flex-col items-center bg-white stroke-[#DBDADE] shadow max-w-[30%] max-xl:max-w-[35%] max-sm:max-w-[90%] w-full rounded-[16px]"
  >
    <v-icon
      :icon="pricingIcon"
      class="!text-[50px] max-xl:!text-[35px] text-[#FD6A2A] !mt-[24px] !mb-[14px] max-xl:!mb-[10px]"
    ></v-icon>
    <h3 class="text-[24px] text-black font-semibold mb-[14px] max-xl:mb-[10px]">
      {{ pricingType }}
    </h3>
    <h4 class="text-[16px] text-black font-semibold mb-[14px] max-xl:mb-[10px]">
      {{ cost }}
    </h4>
    <h4 class="text-[14px] text-black font-semibold mb-[14px] max-xl:mb-[10px]">
      {{ billMethod }}
    </h4>
    <div
      class="flex flex-col items-start p-[32px] max-xl:p-[16px] justify-items-center"
    >
      <div v-for="(item, index) in benefit" :key="index">
        <p
          v-if="item != null"
          class="text-[#667085] text-[16px] max-xl:text-[12px] font-normal mb-[16px] max-xl:mb-[12px]"
        >
          <v-icon
            icon="mdi mdi-check-circle-outline"
            class="!text-[24px] text-[#FD6A2A] !mr-[12px] max-xl:!mr-[6px]"
          ></v-icon
          >{{ item }}
        </p>
      </div>
    </div>
    <button
      class="text-[16px] text-white font-semibold bg-[#FD6A2A] px-[120.5px] max-xl:px-[50px] max-sm:px-[80px] py-[12px] max-xl:py-[6px] rounded-[8px] cursor-pointer mb-[32px]"
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
