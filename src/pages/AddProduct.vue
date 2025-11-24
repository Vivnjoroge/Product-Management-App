<template>
  <div class="min-h-screen bg-[#f6f7fb] flex flex-col items-center py-16">
    <div class="w-full max-w-3xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
      <p class="text-base text-[#7c7ea4] mb-8">Enter the details below to add a new item to your inventory.</p>
      <form @submit.prevent="onSubmit" class="bg-white rounded-2xl shadow p-10 space-y-8">
        <!-- Product Information -->
        <div>
          <div class="font-semibold text-gray-900 mb-4 border-b pb-2">Product Information</div>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Product Title</label>
              <input v-model="form.title" required placeholder="Enter product title" class="w-full border border-gray-200 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Product Description</label>
              <textarea v-model="form.description" rows="4" placeholder="Provide a detailed description of the product" class="w-full border border-gray-200 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm"></textarea>
            </div>
          </div>
        </div>
        <!-- Pricing & Inventory -->
        <div>
          <div class="font-semibold text-gray-900 mb-4 border-b pb-2">Pricing & Inventory</div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <label class="block text-sm font-medium mb-2">Price</label>
              <div class="flex items-center">
                <span class="inline-block px-3 py-4 bg-gray-50 border border-gray-200 rounded-l-lg text-gray-400">$</span>
                <input v-model.number="form.price" type="number" min="0" step="0.01" placeholder="0.00" class="w-full border border-gray-200 rounded-r-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Stock Quantity</label>
              <input v-model.number="form.stock" type="number" min="0" placeholder="Enter stock quantity" class="w-full border border-gray-200 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium mb-2">Category</label>
              <select v-model="form.category" required class="w-full border border-gray-200 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm">
                <option value="">Select a category</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Media -->
        <div>
          <div class="font-semibold text-gray-900 mb-4 border-b pb-2">Media</div>
          <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-[#f6f7fb]">
            <svg class="w-10 h-10 text-indigo-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <label class="text-indigo-700 font-semibold cursor-pointer">
              <span>Click to upload</span>
              <input type="file" class="hidden" @change="onFileChange" accept="image/*" />
            </label>
            <span class="text-xs text-gray-400 mt-2">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
            <div v-if="form.thumbnail" class="mt-4">
              <img :src="form.thumbnail" alt="Preview" class="max-h-32 rounded-lg border" />
            </div>
          </div>
        </div>
        <!-- Actions -->
        <div class="flex items-center justify-end gap-4 pt-4">
          <button type="button" class="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold" @click="router.push({ name: 'Products' })">Cancel</button>
          <button type="submit" class="px-6 py-3 rounded-lg bg-indigo-700 text-white font-semibold shadow hover:bg-indigo-800" :disabled="store.isLoading">Save Product</button>
        </div>
        <p v-if="store.error" class="text-red-600 mt-2">{{ store.error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

const router = useRouter()
const store = useProductStore()

const form = reactive({ title: '', description: '', category: '', price: 0, stock: 0, thumbnail: '' })

async function onSubmit() {
  try {
    const res = await store.addProduct(form)
    // go to product detail if API returned id
    if (res && res.id) router.push({ name: 'ProductView', params: { id: res.id } })
    else router.push({ name: 'Products' })
  } catch (err) {
    // error shown from store
  }
}
</script>

<style scoped>
</style>
