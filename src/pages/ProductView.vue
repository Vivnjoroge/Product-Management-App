<template>
  <div class="min-h-screen bg-[#f6f7fb] pb-10">
    <!-- Top Navbar -->
    <nav class="flex items-center justify-between px-12 py-6 bg-white shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#1a237e] flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/></svg>
        </div>
        <span class="text-xl font-bold text-gray-900">Product Management</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input type="text" placeholder="Search" class="rounded-xl border border-gray-200 px-5 py-2 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-[#1a237e] bg-white shadow-sm w-64" />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#a1a1aa" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="#a1a1aa" stroke-width="2"/></svg>
          </span>
        </div>
        <router-link class="bg-[#1a237e] hover:bg-[#283593] text-white font-semibold rounded-lg px-5 py-2 flex items-center gap-2 shadow transition" :to="{ name: 'AddProduct' }">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" stroke="#fff" stroke-width="2"/></svg>
          Add Product
        </router-link>
        <button class="bg-[#f6f7fb] rounded-full w-10 h-10 flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#a1a1aa" stroke-width="2"/></svg>
        </button>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" class="w-10 h-10 rounded-full object-cover border" />
      </div>
    </nav>
    <div v-if="isLoading" class="flex items-center justify-center h-[60vh]">
      <div class="text-lg text-gray-500">Loading product...</div>
    </div>
    <div v-else-if="error" class="flex items-center justify-center h-[60vh]">
      <div class="text-lg text-red-500">{{ error }}</div>
    </div>
    <template v-else>
      <!-- Breadcrumb -->
      <div class="pt-8 px-12 text-sm text-gray-400 flex items-center gap-2">
        <span>Products</span>
        <span>/</span>
        <span class="text-gray-700">{{ product.title }}</span>
      </div>

      <div class="flex gap-10 px-12 mt-6">
        <!-- Product Image -->
        <div class="bg-white rounded-2xl shadow flex items-center justify-center w-[420px] h-[420px]">
          <img :src="product.images?.[0] || product.thumbnail" alt="image" class="max-w-full max-h-full object-cover rounded-xl" />
        </div>

        <!-- Product Details -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-2">
            <h1 class="text-4xl font-bold text-gray-900">{{ product.title }}</h1>
            <button class="bg-[#eef0fa] text-[#1a237e] font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:bg-indigo-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" stroke="#1a237e" stroke-width="2"/></svg>
              Edit Product
            </button>
          </div>
          <p class="mt-2 text-gray-600 text-lg">A stylish and durable jacket made from genuine leather, perfect for all seasons.</p>
          <div class="mt-6 grid grid-cols-2 gap-8">
            <div>
              <div class="text-xs text-gray-500">Price</div>
              <div class="text-2xl font-bold text-gray-900 mt-1">${{ product.price }}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Category</div>
              <span class="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">Apparel</span>
            </div>
            <div>
              <div class="text-xs text-gray-500">Stock</div>
              <span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">In Stock</span>
              <span class="ml-2 text-gray-700 text-sm">{{ product.stock }} units</span>
            </div>
          </div>
          <div class="mt-8">
            <div class="font-semibold text-gray-900 mb-1">Description</div>
            <p class="text-gray-700 text-base leading-relaxed">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div class="mt-12 px-12">
        <div class="bg-white rounded-2xl shadow p-8">
          <div class="text-lg font-semibold text-gray-900 mb-6">Customer Reviews</div>
          <div class="flex gap-10 items-center">
            <div class="flex flex-col items-center justify-center w-32">
              <div class="text-4xl font-bold text-gray-900">4.5</div>
              <div class="flex gap-1 mt-2">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z"/></svg>
                </span>
              </div>
              <div class="text-xs text-gray-500 mt-2">Based on 120 reviews</div>
            </div>
            <div class="flex-1">
              <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-2 mb-2">
                <div class="text-sm text-gray-700 w-4">{{ star }}</div>
                <div class="flex-1 h-2 bg-gray-100 rounded">
                  <div :style="{ width: reviewPercent(star) + '%' }" class="h-2 rounded bg-yellow-400"></div>
                </div>
                <div class="text-xs text-gray-500 w-10 text-right">{{ reviewPercent(star) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal v-if="showConfirm" title="Delete product" message="Delete this product?" @confirm="deleteItem" @cancel="showConfirm=false" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import ConfirmModal from '../components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const id = route.params.id
const product = ref({})
const showConfirm = ref(false)
const isLoading = ref(true)
const error = ref(null)

async function load() {
  isLoading.value = true
  error.value = null
  try {
    const res = await store.fetchProductById(id)
    product.value = res
  } catch (err) {
    error.value = err.message || 'Product not found.'
  } finally {
    isLoading.value = false
  }
}

function goBack() { router.back() }

function confirmDelete() { showConfirm.value = true }

async function deleteItem() {
  await store.deleteProduct(id)
  showConfirm.value = false
  router.push({ name: 'Products' })
}

function reviewPercent(star) {
  // Dummy data for review breakdown
  if (star === 5) return 75
  if (star === 4) return 15
  if (star === 3) return 5
  if (star === 2) return 3
  if (star === 1) return 2
  return 0
}

onMounted(load)
</script>

<style scoped>
</style>
