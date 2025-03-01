<template>
  <BasicNavbar />
  <router-view></router-view>
  <BasicFooter />
</template>

<script setup>
import BasicNavbar from "@components/navbar/BasicNavbar.vue";
import BasicFooter from "./components/partials/Footer.vue";
</script>

<style scoped></style>
