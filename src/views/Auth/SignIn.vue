<template>
  <div class="mx-[5%] md:mx-[30%] my-[16px] md:my-[32px]">
    <AuthenticationCard authType="Sign In">
      <template #form>
        <form class="flex flex-col justify-center w-full">
          <v-text-field
            class="mb-[22px]"
            label="Username or Email"
            type="email"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="compact"
            hide-details="auto"
            required
          >
            <template v-slot:append-inner>
              <v-icon @click="togglePassword" class="cursor-pointer">
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template></v-text-field
          >
          <v-checkbox
            class="text-black custom-checkbox"
            :ripple="false"
            density="compact"
            hide-details="auto"
          >
            <template v-slot:label>
              <span class="text-[14px] font-semibold !text-[#667085]"
                >Remember me</span
              >
            </template>
          </v-checkbox>
          <button
            class="bg-[#FD6A2A] px-[40%] py-[12px] rounded-[8px] text-white text-[16px] font-semibold mt-[18px] cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </template>
      <template #autChoice>
        <div class="flex flex-col w-full items-center mt-[32px]">
          <span class="text-black text-[15px] font-normal text-center"
            >Dont have an Account?
            <router-link class="text-[#403D91] hover:underline" to="/sign-up"
              >Sign Up</router-link
            ></span
          >
        </div>
      </template>
    </AuthenticationCard>
  </div>
</template>
<script setup>
import AuthenticationCard from "../../components/cards/AuthenticationCard.vue";

import { ref } from "vue";

const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
<style scoped>
.custom-checkbox {
  color: #667085 !important;
}
</style>
