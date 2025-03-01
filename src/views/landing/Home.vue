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
import BasicNavbar from "../../components/navbar/BasicNavbar.vue";
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
</script>
