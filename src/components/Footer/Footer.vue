<template>
  <div class="bg-[#403D91]">
    <div class="flex flex-col gap-[12px] md:gap-[24px] mx-[70px] py-[24px]">
      <div class="flex flex-col md:flex-row md:justify-between">
        <div class="flex flex-col w-full md:w-1/3 gap-[12px] md:gap-[24px]">
          <img
            src="@assets/img/company Logo/Logo.png"
            alt=""
            class="size-[44px]"
          />
          <p class="text-white text-[16px] font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit
          </p>
          <div class="flex flex-row gap-[12px] md:gap-[24px]">
            <v-icon
              icon="mdi mdi-instagram"
              class="!text-[24px] text-white"
            ></v-icon>
            <v-icon
              icon="mdi mdi-twitter"
              class="!text-[24px] text-white"
            ></v-icon>
          </div>
        </div>
        <div class="flex flex-col w-full md:w-1/3 gap-[8px] max-sm:mt-[24px]">
          <h3 class="text-white text-[16px] font-bold">Contact Info</h3>
          <div class="flex flex-row gap-[8px]">
            <v-icon
              icon="mdi mdi-map-marker"
              class="!text-[24px] text-white"
            ></v-icon>
            <p class="text-white text-[14px] font-normal">
              Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat
              Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat
              Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat Ini Alamat
              Ini Alamat Ini Alamat
            </p>
          </div>
          <div class="flex flex-row gap-[8px]">
            <v-icon
              icon="mdi mdi-email-outline"
              class="!text-[24px] text-white"
            ></v-icon>
            <div class="flex flex-col gap-[8px]">
              <p class="text-white text-[14px] font-normal">
                corporate@bola.com
              </p>
              <p class="text-white text-[14px] font-normal">
                bolabasket@gmail.com
              </p>
            </div>
          </div>
          <div class="flex flex-row gap-[8px]">
            <v-icon
              icon="mmdi mdi-phone"
              class="!text-[24px] text-white"
            ></v-icon>
            <p class="text-white text-[14px] font-normal">+62 82112882656</p>
          </div>
        </div>
      </div>
      <v-divider horizontal :thickness="3" class="!text-white"></v-divider>
      <p class="text-white text-[16px] font-bold text-center">
        © Copyright {{ new Date().getFullYear() }}, HAHAHAHAHAHAHAHAHAHAHAHAH
      </p>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
