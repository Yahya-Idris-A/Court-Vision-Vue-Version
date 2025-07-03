<template>
  <div
    class="flex flex-col items-center gap-[10px] w-full mt-[32px] mr-[20px] max-sm:mt-[16px]"
  >
    <!-- Header -->
    <div
      class="flex flex-row items-center justify-start w-full p-[20px] bg-white stroke-[#667085] shadow"
    >
      <p class="text-[18px] text-[#4B465C] font-semibold">List of Videos</p>
    </div>
    <!-- List of Videos -->
    <div class="flex flex-col items-center justify-start w-full">
      <VideosCard
        v-for="item in videos"
        :thumbnail="item.thumbnail"
        :title="item.title"
        :date="item.date"
        :uploadProgress="item.uploadProgress"
        :uploadStatus="item.uploadStatus"
        detailAnalysisUrl="/profile/detail-analyze"
      />
    </div>
    <!-- <div className="flex mt-4 w-full justify-end mr-[30px]">
      <Pagination
        :current-page="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @pageChange="setCurrentPage"
      />
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import VideosCard from "@components/cards/VideosCard.vue";
import Pagination from "@components/partials/pagination.vue";
import thumbnail from "@assets/img/thumb/thumbnail.jpg";
import * as analyzeService from "@/services/analyzeService.js";
import * as ExtendedEventSource from "extended-eventsource";

const videos = ref([]);
const currentPage = ref(1);
const currentData = ref([]);
const itemsPerPage = 3;

const totalItems = computed(() => {
  return videos.value.length;
});

// const currentData = computed(() => {
//   return sampleData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
// });

// const currentData = sampleData.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );

function setCurrentData() {
  currentData.value = videos.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  );
}

function setCurrentPage(newPage) {
  currentPage.value = newPage;
  setCurrentData();
  console.log(currentData.value);
}

const getAllVideos = async () => {
  try {
    const rawData = await analyzeService.getAllVideos();
    console.log("video data: ", rawData.data.videos);

    const formattedData = rawData.data.videos.map((item) => {
      return {
        id: item.id,
        thumbnail: thumbnail,
        title: item.title,
        date: item.date,
        uploadProgress: null,
        uploadStatus: item.status,
        detailAnalysisUrl: `/profile/detail-analyze/${item.id}`,
      };
    });

    // Update state reaktif
    videos.value = formattedData;
  } catch (error) {
    console.error("Gagal mengambil data video:", error);
  }
};

watch(videos, (newVideos) => {
  console.log("State 'videos' telah diperbarui:", newVideos);
});

onMounted(async () => {
  await getAllVideos();
  setCurrentData();
  const token = analyzeService.getToken();

  eventSource = new ExtendedEventSource(analyzeService.endPointUploadProgress, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  eventSource.onmessage = (event) => {
    // Pastikan event.data ada isinya
    if (event.data) {
      try {
        const data = JSON.parse(event.data);

        // 3. Logika update state diubah ke sintaksis Vue
        // Menggunakan videos.value untuk mengakses dan memperbarui array
        const updatedVideos = videos.value.map((video) =>
          video.id === data.video.id
            ? {
                ...video,
                uploadProgress: data.video.progress,
                uploadStatus: data.video.status,
              }
            : video
        );

        videos.value = updatedVideos;
      } catch (e) {
        console.error("Gagal mem-parsing data SSE:", e);
      }
    }
  };

  eventSource.onerror = (error) => {
    console.error("Terjadi error pada koneksi EventSource:", error);
  };
});

onUnmounted(() => {
  if (eventSource) {
    console.log("Menutup koneksi EventSource...");
    eventSource.close();
  }
});
</script>
