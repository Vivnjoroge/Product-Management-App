<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// Root layout — pages render into <router-view>
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar for all authenticated pages except login -->
    <Sidebar v-if="route.name !== 'Login'" />
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Removed top header bar for clean layout -->
      <main class="container mx-auto px-4 py-6 flex-1">
        <router-view />
      </main>
      <footer v-if="route.name !== 'Login'" class="text-center text-sm text-gray-500 py-6">
        <div>AlienSoft Technologies — Internship Assessment • Nairobi, Kenya</div>
      </footer>
    </div>
  </div>
</template>
