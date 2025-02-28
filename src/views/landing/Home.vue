<template>
  <BasicNavbar />
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <FeatureCard
    :cover="FeatureCardImg"
    heading="Upload"
    description="Your Existing Video"
  />
</template>

<script setup>
import BasicNavbar from "../../components/navbar/BasicNavbar.vue";
import FeatureCard from "../../components/cards/FeatureCard.vue";
import FeatureCardImg from "@assets/img/features/ToddBoehly.png";
</script>
