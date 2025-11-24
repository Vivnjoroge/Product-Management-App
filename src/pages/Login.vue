<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#f6f7fb]">

    <!-- Logo -->
    <div class="flex flex-col items-center mb-10">
      <div class="w-11 h-11 rounded-full bg-primary flex items-center justify-center mb-2">
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="10" ry="10" fill="#000080"/>
          <ellipse cx="12" cy="9.5" rx="4.5" ry="2.5" fill="#fff"/>
        </svg>
      </div>
      <h1 class="text-xl font-semibold text-[#000080]">Platform Logo</h1>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.05)] p-10">

      <h2 class="text-2xl font-bold text-center mb-2">Welcome Back</h2>
      <p class="text-sm text-gray-500 text-center mb-8">
        Sign in to manage your products.
      </p>

      <form @submit.prevent="onSubmit" class="space-y-6">

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-2">Email or Username</label>
          <input
            v-model.trim="form.username"
            placeholder="you@example.com"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:ring-[#000080] focus:outline-none bg-white"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model.trim="form.password"
              placeholder="Enter your password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-base focus:ring-2 focus:ring-[#000080] focus:outline-none bg-white"
              required
            />

            <!-- Toggle Eye -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7" />
              </svg>

              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Options -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="remember" class="rounded border-gray-300" />
            <span>Remember me</span>
          </label>

          <a href="#" class="text-[#000080] hover:underline">
            Forgot Password?
          </a>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full h-12 rounded-lg bg-[#000080] text-white font-semibold text-lg hover:bg-[#00006d] transition"
        >
          Login
        </button>

        <!-- Error -->
        <p v-if="error" class="text-red-600 text-sm text-center mt-2">
          {{ error }}
        </p>

      </form>
    </div>

    <!-- Footer -->
    <p class="text-xs text-gray-400 text-center mt-8">
      © 2024 Platform Inc. All Rights Reserved.
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)
const error = ref(null)
// DummyJSON currently accepts 'emilys' as a demo user; adjust as needed
const form = reactive({ username: 'emilys', password: 'emilyspass' })
const showPassword = ref(false)
const remember = ref(true)

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await auth.login(form)
    localStorage.setItem('pm_remember', remember.value ? '1' : '0')
    router.push({ name: 'Products' })
  } catch (err) {
    error.value = auth.error || err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

// If already authenticated, redirect away from /login
watch(
  () => auth.isAuthenticated,
  (is) => { if (is) router.replace({ name: 'Products' }) },
  { immediate: true }
)
</script>

<style scoped>
</style>
