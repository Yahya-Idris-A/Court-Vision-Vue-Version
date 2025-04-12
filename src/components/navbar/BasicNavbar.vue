<template>
  <nav
    id="navbar"
    class="bg-[#403d91] flex justify-end items-center sticky top-0 z-50 h-fit w-full px-[100px] max-sm:px-[20px] max-sm:py-[18px] max-sm:flex-col max-sm:items-end"
  >
    <input type="checkbox" id="sidebar-active" class="hidden" />
    <label id="overlay" for="sidebar-active"></label>
    <div class="flex flex-row justify-between items-center w-full">
      <router-link to="/home" class="h-full flex items-center mr-auto"
        ><img
          src="@assets\img\company Logo\Logo.png"
          alt=""
          class="size-[44px]"
        />
      </router-link>
      <label for="sidebar-active" class="hidden max-sm:block cursor-pointer">
        <v-icon icon="mdi mdi-menu" class="!text-[40px] !text-white"></v-icon>
      </label>
    </div>
    <div
      class="links-container h-full w-full flex flex-row items-center justify-end py-[18px] gap-[64px] max-sm:py-0 max-sm:gap-[40px] max-sm:flex-col max-sm:top-0 max-sm:right-[-100%] max-sm:z-10 max-sm:items-start max-sm:w-[50%] max-sm:fixed max-sm:px-[20px] max-sm:justify-start"
    >
      <label
        for="sidebar-active"
        class="hidden pt-[20px] max-sm:block cursor-pointer"
      >
        <v-icon icon="mdi mdi-close" class="!text-[40px] !text-white"></v-icon>
      </label>
      <router-link
        to="/home"
        class="hover:text-[#FD6A2A] text-[20px] font-semibold rounded-[8px] h-full flex items-center cursor-pointer max-sm:h-auto max-sm:hover:bg-[#FD6A2A] max-sm:hover:text-white max-sm:w-full max-sm:py-2.5 max-sm:px-4.5"
        :class="$route.name == 'Home' ? 'text-[#FD6A2A]' : 'text-white'"
        >Home
      </router-link>
      <router-link
        to="/home"
        class="hover:text-[#FD6A2A] text-[20px] font-semibold rounded-[8px] h-full flex items-center cursor-pointer max-sm:h-auto max-sm:hover:bg-[#FD6A2A] max-sm:hover:text-white max-sm:w-full max-sm:py-2.5 max-sm:px-4.5"
        :class="$route.name == 'Features' ? 'text-[#FD6A2A]' : 'text-white'"
        >Features
      </router-link>
      <router-link
        to="/home"
        class="hover:text-[#FD6A2A] text-[20px] font-semibold rounded-[8px] h-full flex items-center cursor-pointer max-sm:h-auto max-sm:hover:bg-[#FD6A2A] max-sm:hover:text-white max-sm:w-full max-sm:py-2.5 max-sm:px-4.5"
        :class="$route.name == 'Pricing' ? 'text-[#FD6A2A]' : 'text-white'"
        >Pricing
      </router-link>
      <router-link
        to="/home"
        class="hover:text-[#FD6A2A] text-[20px] font-semibold rounded-[8px] h-full flex items-center cursor-pointer max-sm:h-auto max-sm:hover:bg-[#FD6A2A] max-sm:hover:text-white max-sm:w-full max-sm:py-2.5 max-sm:px-4.5"
        :class="$route.name == 'Contact' ? 'text-[#FD6A2A]' : 'text-white'"
        >Contact
      </router-link>
      <div v-if="!user" class="max-sm:w-full">
        <router-link
          to="/sign-in"
          class="bg-[#FD6A2A] text-white px-4.5 py-2.5 rounded-[8px] flex gap-[8px] text-[20px] font-semibold items-center cursor-pointer max-sm:h-auto max-sm:w-full max-sm:justify-center"
        >
          Sign In
          <v-icon
            icon="mdi mdi-login"
            class="!text-[24px] max-sm:!text-[20px] !text-white"
          ></v-icon>
        </router-link>
      </div>
      <div v-if="user" class="max-sm:w-full">
        <router-link
          to="/profile/analyze"
          class="bg-[#FD6A2A] text-white px-4.5 py-2.5 rounded-[8px] flex gap-[8px] text-[20px] font-semibold items-center cursor-pointer max-sm:h-auto max-sm:w-full max-sm:justify-center"
        >
          Dashboard
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from "vue";

const user = localStorage.getItem("token");
</script>
<style scoped>
#sidebar-active:checked ~ .links-container {
  right: 0;
  background-color: #403d91;
}

#sidebar-active:checked ~ #navbar {
  background-color: #403d91 !important;
}

#sidebar-active:checked ~ #overlay {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.links-container {
  transition: 0.25s ease-out;
}

.navbar-top-scrolled {
  background-color: #403d91;
}
</style>
