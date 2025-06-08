<template>
  <div class="flex gap-[0.5rem] items-center mb-[20px]">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="text-[#4B465C] bg-gray-200 rounded-[6px] px-[10px] py-[8px] cursor-pointer"
    >
      <v-icon icon="mdi mdi-arrow-left"></v-icon>
    </button>

    <template v-for="(num, idx) in pageNumbers" :key="idx">
      <button
        v-if="typeof num === 'number'"
        @click="changePage(num)"
        :class="['pagination-button', { active: num === currentPage }]"
      >
        {{ num }}
      </button>
      <span
        v-else
        class="w-[45px] py-[8px] text-[#4B465C] rounded-[6px] transition-all duration-300 bg-[#e5e7eb] text-center"
        >...</span
      >
    </template>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="text-[#4B465C] bg-gray-200 rounded-[6px] px-[10px] py-[8px] cursor-pointer"
    >
      <v-icon icon="mdi mdi-arrow-right"></v-icon>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

// 1. Mendefinisikan props yang diterima dari parent
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 10 },
});

// 2. Mendefinisikan event yang akan di-"emit" ke parent
const emit = defineEmits(["pageChange"]);

// 3. Logika paginasi dimasukkan ke dalam 'computed' property
// Ini sangat efisien karena hanya akan dihitung ulang jika props berubah
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const pageNumbers = computed(() => {
  const pages = [];
  const createPageRange = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (totalPages.value <= 5) {
    pages.push(...createPageRange(1, totalPages.value));
  } else {
    if (props.currentPage < 3) {
      pages.push(...createPageRange(1, 2), "...", totalPages.value);
    } else if (props.currentPage >= totalPages.value - 1) {
      pages.push(
        1,
        "...",
        ...createPageRange(totalPages.value - 1, totalPages.value)
      );
    } else {
      pages.push(
        1,
        "...",
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        "...",
        totalPages.value
      );
    }
  }
  return pages;
});

// Fungsi untuk memanggil emit dengan rapi
function changePage(page) {
  // Validasi agar tidak keluar dari rentang halaman
  if (page < 1 || page > totalPages.value) return;
  emit("pageChange", page);
}
</script>

<style scoped>
.pagination-arrow,
.pagination-button,
.pagination-ellipsis {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  transition: all 0.3s;
  color: #4b465c;
  font-weight: 500;
}

.pagination-button {
  width: 45px;
  padding: 8px 0;
  background-color: #e5e7eb;
  border: none;
}
.pagination-button:hover:not(.active) {
  background-color: #d1d5db;
  cursor: pointer;
}

/* Class untuk tombol yang aktif */
.pagination-button.active {
  background-color: #fd6a2a;
  color: white;
  cursor: default;
}
</style>
