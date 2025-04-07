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
import coordinatesData from "@assets/data/trackingData.json";

const playersCoordinates = ref([]);

const courtContainer = ref(null);
const courtImage = ref(null);
let heatmapInstance = null;

// Ukuran asli lapangan (misalnya dalam meter, sesuai dengan data koordinat)
const COURT_WIDTH = 28; // FIBA: 28m, NBA: 94ft
const COURT_HEIGHT = 15; // FIBA: 15m, NBA: 50ft
const virtualCourtWidth = ref(0);
const virtualCourtHeight = ref(0);
const scaleX = ref(0);
const scaleY = ref(0);
const scaleXForPlayer = ref(0);
const scaleYForPlayer = ref(0);
const finalDataCoordinates = ref([]);
const heatmapRadius = ref(100);

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
  // Small delay to ensure image dimensions are fully set
  setTimeout(initHeatmap, 100);
};

const getHeatmapData = (playerIds = []) => {
  const heatmapMap = new Map();

  // Jika tidak ada ID yang diberikan, ambil semua ID pemain
  const selectedIds =
    playerIds.length > 0 ? playerIds : Object.keys(playersCoordinates.value);
  let maxIntensity = Number.MIN_VALUE;

  selectedIds.forEach((id) => {
    if (!playersCoordinates.value[id]) return;

    playersCoordinates.value[id].forEach((point) => {
      if (virtualCourtWidth.value <= point.x) {
        virtualCourtWidth.value = point.x;
      }
      if (virtualCourtHeight.value <= point.y) {
        virtualCourtHeight.value = point.y;
      }
    });
  });

  scaleXForPlayer.value = COURT_WIDTH / virtualCourtWidth.value;
  scaleYForPlayer.value = COURT_HEIGHT / virtualCourtHeight.value;

  selectedIds.forEach((id) => {
    if (!playersCoordinates.value[id]) return;

    playersCoordinates.value[id].forEach((point) => {
      const key = `${Math.round(point.x * scaleXForPlayer.value)},${Math.round(
        point.y * scaleYForPlayer.value
      )}`; // Buat key unik berdasarkan koordinat

      if (heatmapMap.has(key)) {
        heatmapMap.set(key, heatmapMap.get(key) + 1); // Jika sudah ada, tambahkan jumlah
      } else {
        heatmapMap.set(key, 1); // Jika belum ada, inisialisasi dengan 1
      }
    });
  });

  const heatmapData = Array.from(heatmapMap, ([key, value]) => {
    const [x, y] = key.split(",").map(Number); // Ambil kembali x dan y dari key
    return {
      x: x,
      y: y,
      value, // Jumlah kemunculan sebagai nilai heatmap
    };
  });

  heatmapData.forEach((data) => {
    if (maxIntensity <= data.value) {
      maxIntensity = data.value;
    }
  });

  finalDataCoordinates.value = {
    max: maxIntensity,
    data: heatmapData.map((coordinate) => ({
      x: coordinate.x,
      y: coordinate.y,
      value: coordinate.value, // Tidak berubah
    })),
  };
};

// Inisiasi Heatmap
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
      radius: heatmapRadius.value,
      maxOpacity: 0.6,
      minOpacity: 0.2,
      blur: 0.85,
    });

    // Data dummy
    const dataPoints = {
      max: 10, // Nilai maksimal intensitas
      data: [{ x: 2137, y: 1138, value: 10 }],
    };

    getHeatmapData([]);

    const scaledDataPoints = {
      max: finalDataCoordinates.value.max,
      data: finalDataCoordinates.value.data.map((point) => ({
        x: Math.round(point.x * scaleX.value),
        y: Math.round(point.y * scaleY.value),
        value: point.value, // Tidak berubah
      })),
    };

    heatmapInstance.setData(scaledDataPoints);
  } catch (error) {
    console.error("Error initializing heatmap:", error);
  }
};

const handleResize = () => {
  // Need to completely reinitialize on resize
  setTimeout(initHeatmap, 200);
};

onMounted(() => {
  playersCoordinates.value = coordinatesData;

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
