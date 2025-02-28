<template>
  <header class="bg-white">
    <nav
      class="flex justify-between items-center px-[80px] py-[18px] bg-white stroke-[#667085] shadow max-sm:px-[30px]"
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
        class="flex justify-end items-center gap-[24px] max-sm:flex-col max-sm:absolute max-sm:bg-white max-sm:stroke-[#667085] max-sm:shadow max-sm:left-0 max-sm:top-[10%] max-sm:w-full max-sm:pb-[20px]"
      >
        <!-- Navigation -->
        <div class="">
          <ul class="flex max-sm:flex-col items-center gap-[24px]">
            <li>
              <a
                class="text-[#667085] hover:text-[#FD6A2A] text-[16px] font-semibold"
                href=""
                >Home</a
              >
            </li>
            <li>
              <a
                class="text-[#667085] hover:text-[#FD6A2A] text-[16px] font-semibold"
                href=""
                >Fetaures</a
              >
            </li>
            <li>
              <a
                class="text-[#667085] hover:text-[#FD6A2A] text-[16px] font-semibold"
                href=""
                >Pricing</a
              >
            </li>
            <li>
              <a
                class="text-[#667085] hover:text-[#FD6A2A] text-[16px] font-semibold"
                href=""
                >Contact</a
              >
            </li>
          </ul>
        </div>
        <!-- login button -->
        <div class="">
          <button
            class="bg-[#FD6A2A] text-white px-4.5 py-2.5 rounded-[8px] flex gap-[8px] text-[16px] font-semibold items-center"
          >
            Log In
            <img
              src="@assets/img/icon/LogInIcon.png"
              class="size-[20px]"
              alt=""
            />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup></script>
<style scoped></style>
