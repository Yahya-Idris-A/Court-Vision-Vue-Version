<template>
  <header class="bg-white sticky top-0 z-50">
    <nav
      class="flex justify-between items-center px-[100px] py-[18px] bg-white stroke-[#667085] shadow max-sm:px-[30px]"
    >
      <!-- Logo -->
      <div class="">
        <img
          src="@assets\img\company Logo\Logo.png"
          alt=""
          class="size-[44px]"
        />
      </div>
      <!-- Content -->
      <div
        class="flex justify-end items-center gap-[64px] max-sm:flex-col max-sm:absolute max-sm:bg-white max-sm:stroke-[#667085] max-sm:shadow max-sm:left-0 max-sm:w-full max-sm:pb-[20px]"
        :class="
          isMenuOpen ? 'max-sm:top-[100%]' : 'max-sm:-top-full max-sm:hidden'
        "
      >
        <!-- Navigation -->
        <div class="">
          <ul class="flex max-sm:flex-col items-center gap-[64px]">
            <li>
              <router-link
                to="/"
                class="hover:text-[#FD6A2A] text-[20px] font-semibold"
                :class="
                  $route.name == 'Home' ? 'text-[#FD6A2A]' : 'text-[#667085]'
                "
                >Home
              </router-link>
            </li>
            <li>
              <a
                class="hover:text-[#FD6A2A] text-[20px] font-semibold"
                :class="
                  $route.name == 'Features'
                    ? 'text-[#FD6A2A]'
                    : 'text-[#667085]'
                "
                href=""
                >Fetaures</a
              >
            </li>
            <li>
              <a
                class="hover:text-[#FD6A2A] text-[20px] font-semibold"
                :class="
                  $route.name == 'Pricing' ? 'text-[#FD6A2A]' : 'text-[#667085]'
                "
                href=""
                >Pricing</a
              >
            </li>
            <li>
              <a
                class="hover:text-[#FD6A2A] text-[20px] font-semibold"
                :class="
                  $route.name == 'Contact' ? 'text-[#FD6A2A]' : 'text-[#667085]'
                "
                href=""
                >Contact</a
              >
            </li>
          </ul>
        </div>
        <!-- login button -->
        <div class="">
          <router-link
            to="/sign-in"
            class="bg-[#FD6A2A] text-white px-4.5 py-2.5 rounded-[8px] flex gap-[8px] text-[20px] font-semibold items-center cursor-pointer"
          >
            Log In
            <img
              src="@assets/img/icon/LogInIcon.png"
              class="size-[24px]"
              alt=""
            />
          </router-link>
        </div>
      </div>
      <v-icon
        :icon="isMenuOpen ? 'mdi mdi-close' : 'mdi mdi-menu'"
        class="!text-[40px] cursor-pointer md:!hidden"
        @click="onToggleMenu"
      ></v-icon>
    </nav>
  </header>
</template>
<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const onToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
<style scoped></style>
