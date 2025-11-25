<template>
  <aside class="w-64 bg-white border-r min-h-screen flex flex-col pt-4 pb-8 px-0">
    <!-- Logo and Title -->
    <div>
      <div class="flex flex-col items-start gap-2 mb-8">
        <div class="w-12 h-12 rounded-full bg-[#e5e7eb] flex items-center justify-center mb-1">
          <span class="text-lg font-bold text-[#7c7ea4]">E</span>
        </div>
        <div class="ml-1">
          <div class="font-semibold text-gray-800 text-base leading-tight">E-Commerce</div>
          <div class="text-xs text-[#7c7ea4] leading-tight">Admin Panel</div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-2">
        <!-- Dashboard -->
        <router-link
          to="/dashboard"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="isActive('/dashboard')
            ? 'bg-[#eef0fa] text-[#3f3fbb] font-semibold'
            : 'text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#a1a1aa"/>
          </svg>
          Dashboard
        </router-link>

        <router-link
          to="/products"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold"
          :class="isActive('/products')
            ? 'bg-[#eef0fa] text-[#3f3fbb] font-bold'
            : 'text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#3f3fbb"/>
          </svg>
          Products
        </router-link>

        <router-link
          to="/orders"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="isActive('/orders')
            ? 'bg-[#eef0fa] text-[#3f3fbb] font-semibold'
            : 'text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#a1a1aa"/>
          </svg>
          Orders
        </router-link>

        <router-link
          to="/customers"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="isActive('/customers')
            ? 'bg-[#eef0fa] text-[#3f3fbb] font-semibold'
            : 'text-gray-600 hover:bg-gray-100'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#a1a1aa"/>
          </svg>
          Customers
        </router-link>
      </nav>
    </div>

    <!-- Bottom Section with margin -->
  <div class="mt-16 px-4 flex flex-col gap-2">
    <router-link
      to="/settings"
      class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
      :class="isActive('/settings')
        ? 'bg-[#eef0fa] text-[#3f3fbb] font-semibold'
        : 'text-gray-600 hover:bg-gray-100'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="#a1a1aa" stroke-width="2"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#a1a1aa" stroke-width="2" fill="none"/>
      </svg>
      Settings
    </router-link>
    <button
      @click="logout"
      class="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-[#000080] hover:bg-[#000066] text-white font-semibold"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7" stroke="#ffffff" stroke-width="2"/>
      </svg>
      Logout
    </button>
  </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push({ name: 'Login' })
}

function isActive(path) {
  return route.path === path
}
</script>


