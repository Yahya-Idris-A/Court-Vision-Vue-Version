<template>
  <div class="mx-[100px] max-sm:mx-[20px]">
    <!-- Hero Section -->
    <div
      class="relative h-[500px] flex flex-col justify-center items-center text-center mt-[32px]"
    >
      <!-- Carousel -->
      <div
        class="absolute inset-0 w-full h-full overflow-hidden"
        v-if="isLoaded"
      >
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

      <!-- Hero Section Content -->
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
    <!-- Feature Section -->
    <h1
      class="text-black text-[48px] font-semibold text-center my-[32px] max-sm:my-[8px] max-sm:text-[24px]"
    >
      How It Works
    </h1>
    <div
      class="flex flex-row justify-between items-center gap-10 max-sm:gap-2.5 max-xl:gap-4"
    >
      <FeatureCard
        :cover="FeatureCardImg"
        heading="Upload"
        description="Your Existing Video"
      />
      <div
        class="flex justify-center items-center relative arrow-container max-lg:hidden"
      >
        <div class="arrow-line-start xl:w-[10px] xl:h-[10px]"></div>
        <div class="arrow-line-solid"></div>
        <img
          src="@assets/img/icon/headArrow.png"
          alt=""
          loading="lazy"
          class="head-arrow-icon"
        />
      </div>
      <FeatureCard
        :cover="FeatureCardImg"
        heading="Analyse"
        description="With Tools and Data"
      />
      <div
        class="flex justify-center items-center relative arrow-container max-lg:hidden"
      >
        <div class="arrow-line-start"></div>
        <div class="arrow-line-solid"></div>
        <img
          src="@assets/img/icon/headArrow.png"
          alt=""
          loading="lazy"
          class="head-arrow-icon"
        />
      </div>
      <FeatureCard
        :cover="FeatureCardImg"
        heading="Improve"
        description="Your Team"
      />
    </div>
    <!-- Client Section -->
    <h1
      class="text-black text-[48px] font-semibold text-center my-[32px] max-sm:my-[8px] max-sm:text-[24px]"
    >
      Our Clients
    </h1>
    <div class="relative overflow-hidden w-full">
      <div ref="scrollContainer" class="flex gap-4 w-full overflow-hidden">
        <div
          v-for="(review, index) in displayedReviews"
          :key="index"
          class="flex-shrink-0 w-[43.33%] p-4 max-sm:w-[100%] max-xl:w-[80%]"
        >
          <ClientCard
            :profileImg="profileImg"
            username="Danny Barth"
            position="Executive Vice President"
            :teamImg="teamImg"
            teamName="Oklahoma City Thunder"
            message="It is good to analyse the overall movement and shape of the team, for example to identify areas that were not defended during training. The players are asked to check and watch the video every day."
          />
        </div>
      </div>
    </div>
    <!-- FAQ Section -->
    <h1
      class="text-black text-[48px] font-semibold text-center my-[32px] max-sm:my-[8px] max-sm:text-[24px]"
    >
      Frequently Asked Question
    </h1>
    <div class="flex flex-col gap-[32px] max-sm:gap-[20px] py-4">
      <FAQCard
        question="What Is Basketball?"
        answer="Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop."
      />
      <FAQCard
        question="What Is Basketball?"
        answer="Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop."
      />
      <FAQCard
        question="What Is Basketball?"
        answer="Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop."
      />
      <FAQCard
        question="What Is Basketball?"
        answer="Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop, while preventing the opposing team from shooting through their own hoop."
      />
    </div>
    <!-- Pricing Section -->
    <h1
      class="text-black text-[48px] font-semibold text-center my-[32px] max-sm:my-[8px] max-sm:text-[24px]"
    >
      Pricing
    </h1>
    <div
      class="flex max-sm:flex-wrap max-sm:justify-center flex-row items-center gap-[32px] max-xl:gap-[16px] max-sm:gap-[10px] justify-between w-full py-4"
    >
      <PricingCard
        pricing-icon="mdi mdi-lightning-bolt-circle"
        pricing-type="Basic"
        cost="$9 per month"
        bill-method="Billed every month"
        :benefit="basicBenefit"
      />
      <PricingCard
        pricing-icon="mdi mdi-lightning-bolt-circle"
        pricing-type="Basic"
        cost="$9 per month"
        bill-method="Billed every month"
        :benefit="basicBenefit"
      />
      <PricingCard
        pricing-icon="mdi mdi-lightning-bolt-circle"
        pricing-type="Basic"
        cost="$9 per month"
        bill-method="Billed every month"
        :benefit="basicBenefit"
      />
    </div>
  </div>
  <br /><br /><br />
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

import { ref, onMounted, nextTick } from "vue";

const items = ref([]);
const isLoaded = ref(false); // Tambahkan state untuk menunggu loading biar carousel tidak menampilkan gambar abu-abu

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
  isLoaded.value = true; // gambar sudah keload
};

const reviews = ref([
  { client: "John Doe", feedback: "Website ini sangat membantu!" },
  { client: "Jane Smith", feedback: "Sangat user-friendly dan cepat." },
  { client: "Michael Lee", feedback: "Fitur analitiknya luar biasa!" },
  { client: "Alice Brown", feedback: "Sangat direkomendasikan!" },
]);

// Duplikasi array agar loop seamless
const displayedReviews = ref([...reviews.value, ...reviews.value]);

const scrollContainer = ref(null);

// Fungsi Auto Scrolling ke Kiri
const startScrolling = () => {
  let scrollSpeed = 1; // Kecepatan scroll
  setInterval(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollLeft += scrollSpeed;
      // Jika sudah melewati setengah konten, reset ke awal
      if (
        scrollContainer.value.scrollLeft >=
        scrollContainer.value.scrollWidth / 2
      ) {
        scrollContainer.value.scrollLeft = 0;
      }
    }
  }, 30); // Delay antar pergeseran (atur sesuai kebutuhan)
};

onMounted(async () => {
  await nextTick(); // Menunggu hingga DOM selesai dirender
  startScrolling();
});

onMounted(() => {
  importImages();
});
</script>

<style scoped>
::v-deep(.v-carousel__controls button) {
  color: #fd6a2a !important;
  border-radius: 50% !important;
  width: 15px;
  height: 15px;
}

.arrow-container {
  width: 100%;
  max-width: 200px;
}

.arrow-line-start {
  background-color: #fd6a2a;
  border-radius: 3px;
  width: 10px;
  height: 40px;
  position: absolute;
  left: 15px;
}

.arrow-line-solid {
  background-color: #fd6a2a;
  width: 80%;
  height: 10px;
}

.head-arrow-icon {
  max-height: 40px;
  height: auto;
  margin-top: auto;
  margin-bottom: auto;
  position: absolute;
  right: 0;
}

@media (max-width: 1440px) {
  .arrow-container {
    width: 100%;
    max-width: 80px;
  }

  .arrow-line-start {
    background-color: #fd6a2a;
    border-radius: 3px;
    width: 6px;
    height: 30px;
    position: absolute;
    left: 10px;
  }

  .arrow-line-solid {
    background-color: #fd6a2a;
    width: 70%;
    height: 6px;
  }

  .head-arrow-icon {
    max-height: 24px;
    height: auto;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    position: absolute;
    right: 0;
  }
}
</style>
