<template>
  <BasicNavbar v-if="!isAdminRoute" />
  <div
    v-if="isAdminRoute"
    class="flex flex-row justify-between items-center w-full gap-[32px] max-sm:gap-[16px]"
  >
    <AdminSidebar />
    <div class="flex flex-col items-center justify-start min-h-screen w-full">
      <AdminNavbar />
      <router-view></router-view>
    </div>
  </div>
  <router-view v-if="!isAdminRoute"></router-view>
  <BasicFooter v-if="!isAdminRoute" />
</template>

<script setup>
import BasicNavbar from "@components/navbar/BasicNavbar.vue";
import BasicFooter from "./components/Footer/Footer.vue";
import AdminSidebar from "@components/navbar/AdminSidebar.vue";
import AdminNavbar from "@components/navbar/AdminNavbar.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Cek apakah saat ini berada di halaman admin
const isAdminRoute = computed(() => route.path.startsWith("/profile"));
</script>

<style scoped></style>
