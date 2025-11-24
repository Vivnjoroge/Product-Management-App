<template>
  <div class="flex min-h-screen bg-[#f6f7fb]">
    <Sidebar />
    <div class="flex-1 flex flex-col px-12 py-10 bg-[#f6f7fb]">
      <TopBar />
      <div class="mt-8">
        <div class="flex items-center gap-6 mb-8">
          <div class="flex-1">
            <div class="bg-white rounded-2xl shadow flex items-center px-5 py-3">
              <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#a1a1aa" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="#a1a1aa" stroke-width="2"/></svg>
              <input type="text" placeholder="Search by product name…" class="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base" />
            </div>
          </div>
          <div class="flex gap-4">
            <select class="bg-white rounded-2xl shadow px-5 py-3 text-gray-700 text-base focus:outline-none">
              <option>Category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home</option>
            </select>
            <select class="bg-white rounded-2xl shadow px-5 py-3 text-gray-700 text-base focus:outline-none">
              <option>Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
        <ProductTable />
        <div class="flex items-center justify-between mt-8 text-sm text-gray-500">
          <div>Showing 1 to 10 of 100 results</div>
          <div class="flex gap-3">
            <button class="w-9 h-9 rounded-xl bg-white shadow flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#000080" stroke-width="2"/></svg></button>
            <button class="w-9 h-9 rounded-xl bg-white shadow flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#000080" stroke-width="2"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import TopBar from '../components/TopBar.vue'
import ProductTable from '../components/ProductTable.vue'
</script>
