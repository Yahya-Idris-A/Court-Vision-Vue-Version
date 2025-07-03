<template>
  <div
    class="flex flex-col justify-start items-center bg-white stroke-[#667085] shadow gap-[8px] min-h-screen h-full"
    :class="
      isMenuOpen
        ? 'w-[22%] max-lg:w-[45%] max-xl:w-[40%] max-sm:w-fit'
        : 'max-w-fit'
    "
  >
    <aside class="sticky top-0 z-50 h-screen w-full">
      <div class="flex flex-col h-full justify-between w-full">
        <div class="flex flex-col justify-center items-center">
          <!-- Logo and Indent -->
          <div
            class="flex flex-row items-center w-full max-sm:w-fit px-[18px] max-sm:px-[10px]"
            :class="
              isMenuOpen
                ? 'justify-between max-sm:justify-center'
                : 'justify-center'
            "
          >
            <router-link to="/home" class="h-full flex items-center mr-auto">
              <img
                src="@assets/img/company Logo/Logo.png"
                alt=""
                class="size-[60px] max-sm:size-[30px] max-sm:mt-[10px]"
                :class="isMenuOpen ? '' : 'hidden'"
              />
            </router-link>
            <v-icon
              :icon="
                isMenuOpen
                  ? 'mdi mdi-format-indent-decrease'
                  : 'mdi mdi-format-indent-increase'
              "
              class="!text-[30px] !p-[30px] max-sm:!hidden !text-[#4B465C] cursor-pointer"
              aria-label="Toggle Menu"
              @click="onToggleMenu"
            ></v-icon>
          </div>
          <div
            class="flex flex-col items-center gap-[20px] w-full px-[18px] max-sm:px-[10px]"
          >
            <!-- Header -->
            <div
              class="flex flex-row items-center w-full"
              :class="
                isMenuOpen
                  ? 'justify-between max-sm:justify-center max-sm:flex-col'
                  : 'justify-center'
              "
            >
              <h5
                class="text-[#4B465C] text-[18px] max-sm:text-[8px] font-bold"
                :class="isMenuOpen ? 'mr-[35px] max-sm:mr-0' : 'mr-0'"
              >
                MENU
              </h5>
              <v-divider
                :thickness="2"
                class="max-sm:!hidden"
                :class="isMenuOpen ? '' : '!hidden'"
              ></v-divider>
            </div>
            <!-- Btn My Profile -->
            <router-link
              to="/profile/dashboard"
              class="flex flex-row justify-start items-center w-full max-sm:w-fit px-[16px] max-sm:px-[10px] rounded-[6px] py-[8px] cursor-pointer"
              :class="$route.name == 'My Profile' ? 'bg-[#FD6A2A]' : 'bg-white'"
            >
              <v-icon
                icon="mdi mdi-account-details-outline"
                class="!text-[40px] max-sm:!text-[20px]"
                :class="
                  $route.name == 'My Profile' ? 'text-white' : '!text-[#4B465C]'
                "
              ></v-icon>
              <h2
                class="text-[#4B465C] text-[20px] font-normal ml-[8px] max-sm:hidden"
                :class="[
                  $route.name == 'My Profile'
                    ? 'text-white'
                    : '!text-[#4B465C]',
                  isMenuOpen ? '' : 'hidden',
                ]"
              >
                My Profile
              </h2>
            </router-link>
            <!-- Btn Analyze -->
            <router-link
              to="/profile/analyze"
              class="flex flex-row justify-start items-center w-full max-sm:w-fit px-[16px] max-sm:px-[10px] rounded-[6px] py-[8px] cursor-pointer"
              :class="$route.name == 'Analyze' ? 'bg-[#FD6A2A]' : 'bg-white'"
            >
              <v-icon
                icon="mdi mdi-clipboard-edit-outline"
                class="!text-[40px] max-sm:!text-[20px]"
                :class="
                  $route.name == 'Analyze' ? 'text-white' : '!text-[#4B465C]'
                "
              ></v-icon>
              <h2
                class="text-[20px] font-normal ml-[8px] max-sm:hidden"
                :class="[
                  $route.name == 'Analyze' ? '!text-white' : '!text-[#4B465C]',
                  isMenuOpen ? '' : 'hidden',
                ]"
              >
                Analyze
              </h2>
            </router-link>
            <!-- Btn My Analyze -->
            <router-link
              to="/profile/my-analyze"
              class="flex flex-row justify-start items-center w-full max-sm:w-fit px-[16px] max-sm:px-[10px] rounded-[6px] py-[8px] cursor-pointer"
              :class="
                $route.name == 'My Analyze' || $route.name == 'Detail Analyze'
                  ? 'bg-[#FD6A2A]'
                  : 'bg-white'
              "
            >
              <v-icon
                icon="mdi mdi-clipboard-check-multiple-outline"
                class="!text-[40px] max-sm:!text-[20px]"
                :class="
                  $route.name == 'My Analyze' || $route.name == 'Detail Analyze'
                    ? 'text-white'
                    : '!text-[#4B465C]'
                "
              ></v-icon>
              <h2
                class="text-[#4B465C] text-[20px] font-normal ml-[8px] max-sm:hidden"
                :class="[
                  $route.name == 'My Analyze' || $route.name == 'Detail Analyze'
                    ? 'text-white'
                    : '!text-[#4B465C]',
                  isMenuOpen ? '' : 'hidden',
                ]"
              >
                My Analyze
              </h2>
            </router-link>
          </div>
        </div>
        <div
          class="flex flex-col items-center gap-[20px] w-full px-[18px] max-sm:px-[10px] mb-[10px]"
        >
          <div
            class="flex flex-row items-center w-full max-sm:w-fit px-[18px] max-sm:px-[10px] cursor-pointer rounded-[6px] bg-[#FD6A2A] py-[8px]"
            @click="logout"
          >
            <v-icon
              icon="mdi mdi-logout"
              class="!text-[40px] max-sm:!text-[20px] !text-white"
            ></v-icon>
            <h2
              class="text-white text-[20px] font-normal ml-[8px] max-sm:hidden"
              :class="isMenuOpen ? '' : 'hidden'"
            >
              Sign Out
            </h2>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const isMenuOpen = ref(true);

const onToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
