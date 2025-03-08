<template>
  <div class="relative w-full" ref="courtContainer">
    <!-- Court image -->
    <img
      ref="courtImage"
      src="@assets/img/court/Heatmap.svg"
      alt="Basketball Court"
      class="w-full"
      @load="onImageLoad"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const courtContainer = ref(null);
const courtImage = ref(null);
let heatmapInstance = null;

// Ukuran asli lapangan (misalnya dalam meter, sesuai dengan data koordinat)
const COURT_WIDTH = 28; // FIBA: 28m, NBA: 94ft
const COURT_HEIGHT = 15; // FIBA: 15m, NBA: 50ft
const scaleX = ref(0);
const scaleY = ref(0);

// Load heatmap.js from CDN
const loadHeatmapJs = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.h337) {
      resolve(window.h337);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.2/heatmap.min.js";
    script.async = true;

    script.onload = () => {
      resolve(window.h337);
    };

    script.onerror = () => {
      reject(new Error("Failed to load heatmap.js"));
    };

    document.head.appendChild(script);
  });
};

const onImageLoad = () => {
  // Initialize or reinitialize the heatmap when the image loads
  // console.log("Image loaded, initializing heatmap");
  // Small delay to ensure image dimensions are fully set
  setTimeout(initHeatmap, 100);
};

const initHeatmap = async () => {
  if (!courtContainer.value || !courtImage.value) {
    console.error("Required elements not found");
    return;
  }

  // Clean up any existing instance
  if (heatmapInstance && heatmapInstance._renderer) {
    heatmapInstance = null;
  }

  try {
    const imageRect = courtImage.value.getBoundingClientRect();
    scaleX.value = imageRect.width / COURT_WIDTH;
    scaleY.value = imageRect.height / COURT_HEIGHT;
    // Load the heatmap library
    const h337 = await loadHeatmapJs();

    // Create the heatmap instance
    heatmapInstance = h337.create({
      container: courtContainer.value,
      radius: 50,
      maxOpacity: 0.6,
      minOpacity: 0.2,
      blur: 0.85,
    });

    // const generateRandomData = (count) => {
    //   return Array.from({ length: count }, () => ({
    //     x: Math.floor(Math.random() * 29), // 0 - 28
    //     y: Math.floor(Math.random() * 16), // 0 - 15
    //     value: Math.floor(Math.random() * 10) + 1, // 1 - 10
    //   }));
    // };

    // const dataPoints = {
    //   max: 10,
    //   data: generateRandomData(20000), // Sesuai jumlah data awal
    // };

    const dataPoints = {
      max: 10, // Nilai maksimal intensitas
      data: [
        { x: 12, y: 3, value: 8 },
        { x: 25, y: 8, value: 7 },
        { x: 18, y: 14, value: 6 },
        { x: 9, y: 10, value: 8 },
        { x: 7, y: 12, value: 4 },
        { x: 21, y: 6, value: 5 },
        { x: 26, y: 9, value: 4 },
        { x: 14, y: 7, value: 5 },
        { x: 3, y: 15, value: 3 },
        { x: 20, y: 11, value: 4 },
        { x: 5, y: 2, value: 3 },
        { x: 17, y: 5, value: 2 },
        { x: 28, y: 4, value: 5 },
        { x: 22, y: 10, value: 5 },
        { x: 16, y: 13, value: 4 },
        { x: 11, y: 6, value: 3 },
        { x: 8, y: 1, value: 5 },
        { x: 27, y: 14, value: 6 },
        { x: 19, y: 7, value: 7 },
        { x: 6, y: 8, value: 6 },
        { x: 2, y: 9, value: 5 },
        { x: 23, y: 3, value: 4 },
        { x: 13, y: 12, value: 5 },
        { x: 10, y: 2, value: 7 },
        { x: 24, y: 15, value: 6 },
        { x: 1, y: 0, value: 5 },
      ],
    };

    const scaledDataPoints = {
      max: dataPoints.max,
      data: dataPoints.data.map((point) => ({
        x: Math.round(point.x * scaleX.value),
        y: Math.round(point.y * scaleY.value),
        value: point.value, // Tidak berubah
      })),
    };
    // console.log(scaledDataPoints.data);

    heatmapInstance.setData(scaledDataPoints);

    // console.log("Heatmap initialized successfully");
  } catch (error) {
    console.error("Error initializing heatmap:", error);
  }
};

const handleResize = () => {
  // console.log("Window resized");
  // Need to completely reinitialize on resize
  setTimeout(initHeatmap, 200);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // Initial setup
  if (courtImage.value && courtImage.value.complete) {
    onImageLoad();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  heatmapInstance = null;
});
</script>

<style scoped></style>
