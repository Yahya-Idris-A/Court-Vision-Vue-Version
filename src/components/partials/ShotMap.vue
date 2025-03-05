<!-- <template>
  <div ref="container" class="relative w-full h-[1000px]">
    <img
      :src="court"
      alt=""
      class="absolute inset-0 w-full h-full object-contain"
    />

    <div class="absolute inset-0 flex flex-col items-center w-full">
      <div class="flex flex-row justify-between items-center w-full">
        <p>1</p>
        <p>1</p>
      </div>
      <div class="flex flex-row justify-center items-center w-full">
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
      <div class="flex flex-row justify-center items-center w-full">
        <p>1</p>
      </div>
      <div class="flex flex-row justify-center items-center w-full">
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import court from "@/assets/img/court/Shotmap.svg";

const container = ref(null);

// const setHeight = () => {
//   const img = new Image();
//   img.src = court;

//   img.onload = () => {
//     if (container.value) {
//       container.value.style.height = `${img.height}px`;
//     }
//   };
// };

// onMounted(() => {
//   setHeight();
// });
</script>

<style scoped></style> -->

<!-- <template>
  <div ref="courtRef" class="relative w-full" @click="addShot">
    <img
      src="@/assets/img/court/ShotmapFull.svg"
      alt="Basketball Court"
      class="w-full"
    />
    <div
      v-for="(shot, index) in shots"
      :key="index"
      class="shot"
      :style="shotStyle(shot)"
    >
      {{ shot.value }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shots = ref([
  { x: 100, y: 150, value: "3" },
  { x: 200, y: 250, value: "2" },
]);

const courtRef = ref(null);

const shotStyle = (shot) => ({
  position: "absolute",
  left: `${shot.x}px`,
  top: `${shot.y}px`,
  color: "white",
  backgroundColor: "rgba(255, 0, 0, 0.7)",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
});

// const addShot = (event) => {
//   if (!courtRef.value) return;

//   const rect = courtRef.value.getBoundingClientRect();
//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;
//   const value = prompt("Enter shot value (e.g., 2 or 3):");

//   if (value) {
//     shots.value.push({ x, y, value });
//   }
// };
</script>

<style scoped></style> -->

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
      v-for="(shot, index) in adjustedShots"
      :key="index"
      class="shot w-[20px] h-[20px] text-[10px] max-xl:w-[10px] max-xl:h-[10px] max-xl:text-[8px] max-sm:w-[8px] max-sm:h-[8px] max-sm:text-[5px]"
      :style="{
        left: `${shot.x}px`,
        top: `${shot.y}px`,
      }"
    >
      {{ shot.value }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

// Ukuran asli lapangan (misalnya dalam meter, sesuai dengan data koordinat)
const COURT_WIDTH = 14; // FIBA: 28m, NBA: 94ft
const COURT_HEIGHT = 15; // FIBA: 15m, NBA: 50ft

// Data asli koordinat pemain (berdasarkan ukuran lapangan asli) x = height y = width
const shots = ref([
  { x: 1, y: 1.5, value: "4" },
  { x: 7.5, y: 14, value: "3" },
  { x: 4, y: 10, value: "2" },
  { x: 1, y: 1, value: "1" },
]);

const courtRef = ref(null);
const courtSize = ref({ width: 0, height: 0 });
const scaleX = ref(0);
const scaleY = ref(0);

// Perbarui ukuran lapangan saat halaman dimuat
const updateCourtSize = () => {
  requestAnimationFrame(() => {
    if (courtRef.value) {
      const rect = courtRef.value.getBoundingClientRect();
      courtSize.value = {
        width: rect.width,
        height: rect.height,
      };
      scaleY.value = courtSize.value.width / COURT_WIDTH;
      scaleX.value = courtSize.value.height / COURT_HEIGHT;
      console.log(courtSize);
    }
  });
};

// Hitung koordinat pemain yang sudah disesuaikan dengan ukuran website
const adjustedShots = computed(() => {
  const scaleX = courtSize.value.width / COURT_WIDTH;
  const scaleY = courtSize.value.height / COURT_HEIGHT;

  return shots.value.map((shot) => ({
    x: shot.x * scaleX,
    y: shot.y * scaleY,
    value: shot.value,
  }));
});

onMounted(async () => {
  await nextTick(); // Tunggu sampai DOM selesai diperbarui
  updateCourtSize();
});
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
