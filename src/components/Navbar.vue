<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <router-link to="/products" class="text-white font-semibold">Products</router-link>
    </div>
    <div class="flex items-center gap-3">
      <span v-if="auth.user" class="text-sm text-white/90">{{ auth.user.username }}</span>
      <button v-if="auth.isAuthenticated" @click="logout" class="bg-white text-primary px-3 py-1 rounded">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
</style>
