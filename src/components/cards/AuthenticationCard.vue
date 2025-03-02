<template>
  <div
    class="flex flex-col gap-[10px] items-center bg-white stroke-[#DBDADE] shadow px-[10%] xl:px-[25%] py-[25px] w-full"
  >
    <h1
      class="text-[30px] md:text-[40px] text-black font-bold px-[90px] py-[10px]"
    >
      {{ authType }}
    </h1>
    <slot name="form"></slot>
  </div>
  <slot name="autChoice"></slot>
</template>
<script setup>
const props = defineProps({
  authType: String,
});
</script>
<style scoped>
.custom-checkbox {
  color: #667085 !important;
}
</style>
