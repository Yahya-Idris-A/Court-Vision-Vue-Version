<template>
  <div
    class="relative mx-[80px] h-[500px] flex flex-col justify-center items-center text-center mt-[32px]"
  >
    <!-- Carousel sebagai background -->
    <div class="absolute inset-0 w-full h-full overflow-hidden" v-if="isLoaded">
      <v-carousel
        cycle
        interval="4000"
        hide-delimiter-background
        :show-arrows="false"
        class="w-full h-full rounded-[15px]"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>

    <!-- Konten di atas carousel -->
    <div
      class="mt-[32px] flex flex-col items-center justify-center xl:gap-[24px] gap-[5px] relative z-10"
    >
      <h1
        class="xl:text-[120px] md:text-[54px] lg:text-[84px] text-[34px] font-semibold text-white text-center xl:mx-[209px] lg:mx-[100px] md:mx-[100px] mx-0 xl:leading-[100px] lg:leading-[80px] md:leading-[50px] leading-[40px]"
      >
        Revolutionize Your Basketball Analysis!
      </h1>
      <h5
        class="xl:text-[24px] lg:text-[14px] text-[8px] font-normal text-white mb-[88px] xl:leading-[40px] leading-[10px] xl:mt-[14px] lg:mt-[24px] md:mt-[8px] mt-0 text-center"
      >
        Upload, Analyze, and Improve – Gain Deeper Insights from Your Matches
        Instantly
      </h5>
    </div>
  </div>
  <FeatureCard
    :cover="FeatureCardImg"
    heading="Upload"
    description="Your Existing Video"
  />
  <br />
  <ClientCard
    :profileImg="profileImg"
    username="Danny Barth"
    position="Executive Vice President"
    :teamImg="teamImg"
    teamName="Oklahoma City Thunder"
    message="It is good to analyse the overall movement and shape of the team, for example to identify areas that were not defended during training. The players are asked to check and watch the video every day."
  />
  <br />
  <FAQCard
    question="What Is Basketball?"
    answer="Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop."
  />
  <br />
  <PricingCard
    pricing-icon="mdi mdi-lightning-bolt-circle"
    pricing-type="Basic"
    cost="$9 per month"
    bill-method="Billed every month"
    :benefit="basicBenefit"
  />
</template>

<script setup>
import FeatureCard from "../../components/cards/FeatureCard.vue";
import FeatureCardImg from "@assets/img/features/ToddBoehly.png";
import ClientCard from "@components/cards/ClientCard.vue";
import profileImg from "@assets/img/clients/client1.png";
import teamImg from "@assets/img/company Logo/Logo.png";
import FAQCard from "../../components/cards/FAQCard.vue";
import PricingCard from "../../components/cards/PricingCard.vue";

const basicBenefit = [
  "Access to all basic features",
  "Basic reporting and analytics",
  "20GB individual data each user",
  "Basic chat and email support",
];

import { ref, onMounted } from "vue";

// Inisialisasi array gambar untuk carousel
const items = ref([]);
const isLoaded = ref(false); // Tambahkan state untuk menunggu loading

// Mengimpor semua gambar dari folder carousel
const modules = import.meta.glob(
  "@/assets/img/carousel/*.{png,jpg,jpeg,PNG,JPEG,svg,SVG}"
);

const importImages = async () => {
  const imageList = [];
  for (const path in modules) {
    const module = await modules[path]();
    imageList.push({ src: module.default });
  }
  items.value = imageList;
  isLoaded.value = true; // Tandai bahwa gambar telah dimuat
};

onMounted(importImages);
</script>

<style scoped>
::v-deep(.v-carousel__controls button) {
  color: #fd6a2a !important; /* Warna teks tombol */
  border-radius: 50% !important; /* Membuat tombol berbentuk bulat */
  width: 15px; /* Ubah ukuran tombol */
  height: 15px;
}
</style>
