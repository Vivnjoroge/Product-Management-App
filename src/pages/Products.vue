<template>
  <div class="min-h-screen bg-[#f6f7fb] flex font-sans p-0 m-0">
    <Sidebar selected="Products" />
    <main class="flex-1 px-0 py-0">
      <div class="px-12 pt-12">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Products</h1>
            <p class="text-lg text-[#7c7ea4]">Manage your inventory and view product performance.</p>
          </div>
          <router-link class="bg-[#000080] hover:bg-[#000066] text-white font-semibold rounded-lg px-6 py-3 flex items-center gap-2 shadow transition" :to="{ name: 'AddProduct' }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" stroke="#fff" stroke-width="2"/></svg>
            Add New Product
          </router-link>
        </div>
        <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4 mb-8">
          <div class="flex-1">
            <div class="relative">
              <input v-model.trim="q" placeholder="Search by product name..." class="w-full rounded-xl border border-gray-200 px-5 py-4 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-[#000080] bg-white shadow-sm" />
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#a1a1aa" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="#a1a1aa" stroke-width="2"/></svg>
              </span>
            </div>
          </div>
          <div class="relative">
            <select v-model="filters.category" class="rounded-xl border border-gray-200 px-5 py-4 text-base bg-white shadow-sm pr-10 appearance-none min-w-[180px]">
              <option value="">Category</option>
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#a1a1aa" stroke-width="2"/></svg>
            </span>
          </div>
          <div class="relative">
            <select v-model="filters.stock" class="rounded-xl border border-gray-200 px-5 py-4 text-base bg-white shadow-sm pr-10 appearance-none min-w-[180px]">
              <option value="">Stock Status</option>
              <option value="in">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#a1a1aa" stroke-width="2"/></svg>
            </span>
          </div>
        </div>
        <div class="rounded-2xl bg-white shadow-lg overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-[#f6f7fb]">
              <tr>
                <th class="px-8 py-5 text-left text-base font-semibold text-gray-500">Product</th>
                <th class="px-8 py-5 text-left text-base font-semibold text-gray-500">Category</th>
                <th class="px-8 py-5 text-right text-base font-semibold text-gray-500">Price</th>
                <th class="px-8 py-5 text-right text-base font-semibold text-gray-500">Stock</th>
                <th class="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="5" class="px-8 py-10 text-center text-gray-400 text-lg">No products found.</td>
              </tr>
              <tr v-for="p in filteredProducts" :key="p.id" class="border-b last:border-b-0 hover:bg-[#f6f7fb] transition">
                <td class="px-8 py-6 flex items-center gap-4">
                  <img :src="p.thumbnail || p.images?.[0]" alt="thumb" class="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <div class="font-semibold text-gray-900">{{ p.title }}</div>
                    <div class="text-sm text-[#7c7ea4]">{{ p.description }}</div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span :class="categoryBadge(p.category)">{{ p.category }}</span>
                </td>
                <td class="px-8 py-6 text-right font-medium text-gray-700">${{ p.price.toFixed(2) }}</td>
                <td class="px-8 py-6 text-right">
                  <span class="flex items-center gap-2 justify-end">
                    <span :class="stockDot(p.stock)"></span>
                    <span class="text-sm text-gray-700">{{ stockText(p.stock) }}</span>
                  </span>
                </td>
                <td class="px-8 py-6 text-right flex items-center gap-3 justify-end relative">
                  <button @click="toggleMenu(p.id)" class="text-gray-400 hover:text-indigo-700 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="1.5"/>
                      <circle cx="19" cy="12" r="1.5"/>
                      <circle cx="5" cy="12" r="1.5"/>
                    </svg>
                  </button>
                  <div v-if="openMenu === p.id" class="absolute right-0 top-12 z-10 bg-white rounded-lg shadow-lg py-2 w-36 border">
                    <button @click="viewProduct(p.id); closeMenu()" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">View</button>
                    <button @click="editProduct(p.id); closeMenu()" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</button>
                    <button @click="deleteProduct(p.id); closeMenu()" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="px-8 py-5 text-sm text-[#7c7ea4]">Showing {{ (page - 1) * pageSize + 1 }} to {{ Math.min(page * pageSize, store.total) }} of {{ store.total }} results</div>
        </div>
        <div class="flex justify-end gap-2 mt-8 pb-12">
          <button class="rounded-xl border px-4 py-2 bg-white text-gray-500 hover:bg-[#f6f7fb]" :disabled="page === 1" @click="prevPage">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#000080" stroke-width="2"/></svg>
          </button>
          <button class="rounded-xl border px-4 py-2 bg-white text-gray-500 hover:bg-[#f6f7fb]" :disabled="page === totalPages" @click="nextPage">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#000080" stroke-width="2"/></svg>
          </button>
        </div>
      </div>
    </main>
    <ConfirmModal v-if="showDeleteModal" title="Delete product" message="Are you sure you want to delete this product?" @confirm="confirmDelete" @cancel="cancelDelete" />
<!-- Ensure ConfirmModal is rendered outside the table and main content for proper z-index and event handling -->
  </div>
</template>

<script setup>
import * as api from '../api'
import { useAuthStore } from '../stores/auth'
import { ref, computed, watch, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { useRouter } from 'vue-router'
const router = useRouter()
const showDeleteModal = ref(false)
const productToDelete = ref(null)
const openMenu = ref(null)

function toggleMenu(id) {
  openMenu.value = openMenu.value === id ? null : id
}
function closeMenu() {
  openMenu.value = null
}

function viewProduct(id) {
  router.push({ name: 'ProductView', params: { id } })
}
function editProduct(id) {
  router.push({ name: 'AddProduct', params: { id } })
}
function deleteProduct(id) {
  productToDelete.value = id
  showDeleteModal.value = true
}
async function confirmDelete() {
  try {
    await store.deleteProduct(productToDelete.value)
    showDeleteModal.value = false
    productToDelete.value = null
    await load()
  } catch (err) {
    alert(err.message || 'Failed to delete product')
    showDeleteModal.value = false
    productToDelete.value = null
  }
}
function cancelDelete() {
  showDeleteModal.value = false
  productToDelete.value = null
}
// ...existing code...

const store = useProductStore()
const auth = useAuthStore()
const q = ref('')
const filters = ref({ category: '', stock: '' })
const page = ref(1)
const pageSize = 10

const categories = computed(() => {
  const set = new Set((store.products || []).map(p => p.category).filter(Boolean))
  return Array.from(set).sort()
})

const filteredProducts = computed(() => {
  let list = store.products || []
  if (q.value) {
    const s = q.value.toLowerCase()
    list = list.filter(p => String(p.title).toLowerCase().includes(s))
  }
  if (filters.value.category) list = list.filter(p => p.category === filters.value.category)
  if (filters.value.stock === 'in') list = list.filter(p => p.stock > 20)
  if (filters.value.stock === 'low') list = list.filter(p => p.stock > 0 && p.stock <= 20)
  if (filters.value.stock === 'out') list = list.filter(p => p.stock === 0)
  // Pagination
  return list.slice((page.value - 1) * pageSize, page.value * pageSize)
})

const totalPages = computed(() => {
  const total = (store.products || []).length
  return Math.max(1, Math.ceil(total / pageSize))
})

function prevPage() { if (page.value > 1) page.value-- }
function nextPage() { if (page.value < totalPages.value) page.value++ }

function categoryBadge(category) {
  const map = {
    Electronics: 'bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold',
    Groceries: 'bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold',
    Apparel: 'bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold',
    default: 'bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold'
  }
  return map[category] || map.default
}

function stockDot(stock) {
  if (stock === 0) return 'w-3 h-3 rounded-full bg-red-500'
  if (stock <= 20) return 'w-3 h-3 rounded-full bg-yellow-400'
  return 'w-3 h-3 rounded-full bg-green-500'
}

function stockText(stock) {
  if (stock === 0) return 'Out of Stock'
  if (stock <= 20) return `${stock} Low Stock`
  return `${stock} In Stock`
}

function logout() {
  auth.logout()
  window.location.reload()
}

async function load() {
  // Reset filters and page to show all products
  q.value = ''
  filters.value = { category: '', stock: '' }
  page.value = 1
  // Fetch all products in batches
  let allProducts = []
  let skip = 0
  let batchSize = 30
  let total = 0
  do {
    const res = await api.fetchProducts({ limit: batchSize, skip })
    allProducts = allProducts.concat(res.products)
    total = res.total
    skip += batchSize
  } while (allProducts.length < total)
  store.products = allProducts
  store.total = total
}

onMounted(load)
</script>

<style scoped>
</style>
