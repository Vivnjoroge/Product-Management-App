<template>
  <div class="overflow-x-auto rounded-lg shadow">
      <table class="w-full">
      <thead class="bg-gray-50">
          <tr class="border-b">
            <th class="py-5 px-7 text-left text-gray-500 font-semibold text-base">Product</th>
            <th class="py-5 px-7 text-left text-gray-500 font-semibold text-base">Category</th>
            <th class="py-5 px-7 text-left text-gray-500 font-semibold text-base">Price</th>
            <th class="py-5 px-7 text-left text-gray-500 font-semibold text-base">Stock</th>
            <th class="py-5 px-7"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id" class="hover:bg-gray-50 cursor-pointer" @click="go(p.id)">
          <td class="px-4 py-3 flex items-center gap-3">
            <img :src="p.thumbnail || p.images?.[0]" alt="thumb" class="thumb" />
            <div>
              <div class="font-semibold">{{ p.title }}</div>
              <div class="text-sm text-gray-600 truncate-100 w-96">{{ p.description }}</div>
            </div>
          </td>
          <td class="px-4 py-3">{{ p.category }}</td>
          <td class="px-4 py-3 text-right">${{ p.price }}</td>
          <td class="px-4 py-3 text-right">{{ p.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ products: { type: Array, default: () => [] } })
const router = useRouter()
function go(id) {
  router.push({ name: 'ProductView', params: { id } })
}
</script>

<style scoped>
.thumb { width: 48px; height: 48px; border-radius: 9999px; object-fit: cover }
</style>
