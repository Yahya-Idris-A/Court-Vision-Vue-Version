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
        :thumbnail="thumbnail"
        title="OKC VS Cavs.mp4"
        date="12/12/2012"
        :uploadProgress="10"
        detailAnalysisUrl="/profile/detail-analyze"
      />
      <VideosCard
        :thumbnail="thumbnail"
        title="OKC VS Cavs.mp4"
        date="12/12/2012"
        :uploadProgress="50"
        detailAnalysisUrl="/profile/detail-analyze"
      />
      <VideosCard
        :thumbnail="thumbnail"
        title="OKC VS Cavs.mp4"
        date="12/12/2012"
        :uploadProgress="80"
        detailAnalysisUrl="/profile/detail-analyze"
      />
      <VideosCard
        :thumbnail="thumbnail"
        title="OKC VS Cavs.mp4"
        date="12/12/2012"
        :uploadProgress="100"
        detailAnalysisUrl="/profile/detail-analyze"
      />
    </div>
  </div>
</template>
<script setup>
import VideosCard from "@components/cards/VideosCard.vue";
import thumbnail from "@assets/img/thumb/thumbnail.jpg";
</script>
