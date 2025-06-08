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
        :key="item.id"
        :thumbnail="item.thumbnail"
        :title="item.title"
        :date="item.date"
        :uploadProgress="item.uploadProgress"
        :uploadStatus="item.uploadStatus"
        :detailAnalysisUrl="item.detailAnalysisUrl"
      />
    </div>
    <!-- List of Videos -->
    <div class="flex flex-col items-center justify-start w-full">
      <VideosCard
        v-for="item in currentData"
        :thumbnail="thumbnail"
        :title="item.title"
        :date="item.date"
        :uploadProgress="item.uploadProgress"
        :uploadStatus="item.uploadStatus"
        detailAnalysisUrl="/profile/detail-analyze"
      />
    </div>
    <div className="flex mt-4 w-full justify-end mr-[30px]">
      <Pagination
        :current-page="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @pageChange="setCurrentPage"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import VideosCard from "@components/cards/VideosCard.vue";
import Pagination from "@components/partials/pagination.vue";
import thumbnail from "@assets/img/thumb/thumbnail.jpg";
import * as analyzeService from "@/services/analyzeService.js";

const sampleData = [
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Analisis Final Liga Mahasiswa",
    date: "2025-06-08",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/1",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Sesi Latihan Tembakan Tiga Angka",
    date: "2025-06-05",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/2",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Drill Pertahanan Timnas U-19",
    date: "2025-06-02",
    uploadProgress: 80,
    uploadStatus: "processing",
    detailAnalysisUrl: "/detail-analyze/3",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Highlight Pertandingan Persahabatan",
    date: "2025-05-30",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/4",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Analisis Pola Serangan Tim Merah",
    date: "2025-05-28",
    uploadProgress: 100,
    uploadStatus: "failed",
    detailAnalysisUrl: "/detail-analyze/5",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Scrimmage Game Internal Tim Biru",
    date: "2025-05-25",
    uploadProgress: 90,
    uploadStatus: "failed",
    detailAnalysisUrl: "/detail-analyze/6",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Kualifikasi Pekan Olahraga Nasional",
    date: "2025-05-21",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/7",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Latihan Passing dan Visi Bermain",
    date: "2025-05-19",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/8",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Uji Coba Lapangan Baru",
    date: "2025-05-15",
    uploadProgress: null,
    uploadStatus: "waiting",
    detailAnalysisUrl: "/detail-analyze/9",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Turnamen 3x3 Antar Klub",
    date: "2025-05-12",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/10",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Evaluasi Performa Pemain Muda",
    date: "2025-05-10",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/11",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Analisis Pertandingan: Babak Pertama",
    date: "2025-05-09",
    uploadProgress: 50,
    uploadStatus: "processing",
    detailAnalysisUrl: "/detail-analyze/12",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Sesi Latihan Fisik dan Stamina",
    date: "2025-04-28",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/13",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Pertandingan Ekshibisi All-Star",
    date: "2025-04-25",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/14",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Rekaman Latihan Rutin Pagi Hari",
    date: "2025-04-22",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/15",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Analisis Statistik Pemain Center",
    date: "2025-04-20",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/16",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Video Latihan Tim Tamu",
    date: "2025-04-18",
    uploadProgress: null,
    uploadStatus: "waiting",
    detailAnalysisUrl: "/detail-analyze/17",
  },
  {
    thumbnail: "/thumb/thumbnail.jpg",
    title: "Review Pertandingan Minggu Lalu",
    date: "2025-04-15",
    uploadProgress: 100,
    uploadStatus: "completed",
    detailAnalysisUrl: "/detail-analyze/18",
  },
];

const videos = ref([]);
const currentPage = ref(1);
const currentData = ref([]);
const itemsPerPage = 3;

const totalItems = computed(() => {
  return sampleData.length;
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
  currentData.value = sampleData.slice(
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
  console.log(currentData.value);
  console.log((currentPage.value - 1) * itemsPerPage);
});
</script>
