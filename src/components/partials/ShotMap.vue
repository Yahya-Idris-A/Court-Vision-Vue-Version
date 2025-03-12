<template>
  <div ref="courtRef" class="relative w-full">
    <!-- Gambar Lapangan -->
    <img
      src="@/assets/img/court/Shotmap.svg"
      class="w-full"
      @load="updateCourtSize"
    />

    <!-- Titik Tembakan Pemain -->
    <div
      v-for="(shot, index) in scaledShots"
      :key="index"
      class="shot w-[20px] h-[20px] text-[10px] max-xl:w-[10px] max-xl:h-[10px] max-xl:text-[8px] max-sm:w-[8px] max-sm:h-[8px] max-sm:text-[5px]"
      :style="{
        left: `${shot.x - 10}px`,
        top: `${shot.y - 10}px`,
      }"
    >
      {{ shot.value }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from "vue";

// Ukuran asli lapangan (misalnya dalam meter, sesuai dengan data koordinat)
const COURT_WIDTH = 14; // FIBA: 28m, NBA: 94ft
const COURT_HEIGHT = 15; // FIBA: 15m, NBA: 50ft

// Data asli koordinat pemain (berdasarkan ukuran lapangan asli) x = height y = width
const shots = ref([
  { x: 1, y: 1.5, value: "4" },
  { x: 1 / 65, y: 1 / 75, value: "5" },
  { x: 15, y: 14, value: "3" },
  { x: 4, y: 10, value: "2" },
  { x: 1, y: 1, value: "1" },
]);
const scaledShots = ref([]);

const courtRef = ref(null);
const courtSize = ref({ width: 0, height: 0 });
const scaleX = ref(0);
const scaleY = ref(0);

// Perbarui ukuran lapangan saat halaman dimuat
const updateCourtSize = () => {
  setTimeout(initShotmap, 100);
};

const initShotmap = async () => {
  try {
    const imageRect = courtRef.value.getBoundingClientRect();
    // Get actual dimensions
    courtSize.value = {
      width: imageRect.width,
      height: imageRect.height,
    };

    // Calculate scale factors
    scaleX.value = courtSize.value.width / COURT_WIDTH;
    scaleY.value = courtSize.value.height / COURT_HEIGHT;

    scaledShots.value = shots.value.map((shot) => ({
      // Position from left
      x: (shot.y / COURT_WIDTH) * courtSize.value.width,
      // Position from top
      y: (shot.x / COURT_HEIGHT) * courtSize.value.height,
      value: shot.value,
    }));
  } catch (error) {
    console.error("Error initializing shotmap:", error);
  }
};

const handleResize = () => {
  // console.log("Window resized");
  // Need to completely reinitialize on resize
  setTimeout(initShotmap, 200);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // Initial setup
  if (courtRef.value && courtRef.value.complete) {
    updateCourtSize();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// // Hitung koordinat pemain yang sudah disesuaikan dengan ukuran website
// const adjustedShots = computed(() => {
//   const scaleX = courtSize.value.width / COURT_WIDTH;
//   const scaleY = courtSize.value.height / COURT_HEIGHT;

//   return shots.value.map((shot) => ({
//     x: Math.round(shot.x * scaleX.value),
//     y: Math.round(shot.y * scaleY.value),
//     value: shot.value,
//   }));
// });

// onMounted(async () => {
//   await nextTick(); // Tunggu sampai DOM selesai diperbarui
//   updateCourtSize();
// });
</script>

<style scoped>
.shot {
  position: absolute;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
