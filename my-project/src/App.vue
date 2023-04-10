<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
 <div class="min-h-screen bg-[#221F1F]">

     <Navbar />
     <RouterView />
     <Footer />
 </div>
</template>


