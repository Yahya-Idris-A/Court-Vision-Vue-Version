<template>
  <form
    action=""
    class="flex flex-col gap-[32px] justify-start items-center w-full px-[30px] py-[20px]"
  >
    <!-- Video Title -->
    <div class="w-full">
      <v-text-field
        label="Match Title"
        v-model="title"
        variant="outlined"
        density="compact"
        hide-details="auto"
        required
      ></v-text-field>
    </div>
    <div class="flex flex-row gap-[24px] items-center w-full">
      <!-- Date Picker -->
      <div class="w-full">
        <v-text-field
          v-model="formattedDate"
          label="Match Date"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
          readonly
          @click="menu = true"
          class="custom-icon"
          ><template #prepend-inner>
            <v-icon
              style="color: #667085 !important; font-size: 20px !important"
              icon="mdi mdi-calendar-blank-outline"
            ></v-icon> </template
        ></v-text-field>
        <v-dialog
          v-model="menu"
          max-width="400px"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <v-container>
            <v-row justify="space-around">
              <v-date-picker
                color="primary"
                @update:modelValue="saveDate"
              ></v-date-picker>
            </v-row>
          </v-container>
        </v-dialog>
      </div>
      <!-- Match Venue -->
      <div class="w-full">
        <v-text-field
          label="Match Venue"
          v-model="venue"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
        ></v-text-field>
      </div>
    </div>
    <div class="flex flex-col w-full gap-[10px]">
      <UploadVideo :title="title" :date="formattedDate" :venue="venue" />
    </div>
  </form>
</template>

<script setup>
import UploadVideo from "@components/partials/FormUploadVideo.vue";

import { ref, computed } from "vue";

const title = ref("");
const date = ref(""); // Untuk nyimpan tanggal dalam format yang ditampilkan
const venue = ref("");
const menu = ref(false); // Mengontrol tampilan modal date picker
const formattedDate = computed(() => {
  if (!date.value) return "";

  const localDate = new Date(date.value);

  const year = localDate.getFullYear();

  // getMonth() dimulai dari 0 (Januari=0), jadi kita perlu +1
  const month = (localDate.getMonth() + 1).toString().padStart(2, "0");

  // getDate() mengembalikan hari dalam bulan (1-31)
  const day = localDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
});

// Fungsi nyimpan tanggal dan menutup modal
const saveDate = (newDate) => {
  date.value = newDate; // Simpan tanggal yang dipilih
  menu.value = false; // Tutup modal
};
</script>

<style scoped>
.custom-icon .v-icon {
  color: #9e9e9e !important; /* Warna abu-abu */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 10px;
  background: #1aaa4c;
}

.upload-box > p {
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
}

img {
  width: 100%;
}

.upload-box {
  width: 100vw;
  height: 100vh;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0, 0%);
}

.upload-box form {
  height: 170px;
  display: flex;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #29ba2a;
}

form :where(i, p) {
  color: #29ba2a;
}

form i {
  font-size: 50px;
}

form p {
  margin-top: 15px;
  font-size: 16px;
}

section .row {
  margin-bottom: 10px;
  background: #d0ffd3;
  list-style: none;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

section .row i {
  color: #1aaa4c;
  font-size: 30px;
}

section .details span {
  font-size: 12px;
}

.loading-area .row .content {
  width: 100%;
  margin-left: 15px;
  color: black;
}

.loading-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}

.loading-area .content .loading-bar {
  height: 10px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
}

.content .loading-bar .loading {
  height: 100;
  width: 20%;
  background: #1aaa4c;
  border-radius: inherit;
}
</style>
