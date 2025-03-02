<template>
  <BasicNavbar v-if="!isAdminRoute" />
  <AdminSidebar v-if="isAdminRoute" />
  <router-view></router-view>
  <BasicFooter v-if="!isAdminRoute" />
</template>

<script setup>
import BasicNavbar from "@components/navbar/BasicNavbar.vue";
import BasicFooter from "./components/Footer/Footer.vue";
import AdminSidebar from "@components/navbar/AdminSidebar.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Cek apakah saat ini berada di halaman admin
const isAdminRoute = computed(() => route.path.startsWith("/profile"));
</script>

<style scoped></style>
