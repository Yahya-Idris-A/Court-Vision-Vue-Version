<template>
  <BasicNavbar />
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
</template>

<script setup>
import BasicNavbar from "../../components/navbar/BasicNavbar.vue";
import FeatureCard from "../../components/cards/FeatureCard.vue";
import FeatureCardImg from "@assets/img/features/ToddBoehly.png";
import ClientCard from "@components/cards/ClientCard.vue";
import profileImg from "@assets/img/clients/client1.png";
import teamImg from "@assets/img/company Logo/Logo.png";
</script>
