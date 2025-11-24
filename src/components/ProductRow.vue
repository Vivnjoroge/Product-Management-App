<template>
  <tr class="border-b last:border-none hover:bg-[#f6f7fb] transition">
    <td class="py-5 px-7 flex items-center gap-5">
      <img :src="product.image" alt="" class="w-12 h-12 rounded-full object-cover border" />
      <div>
        <div class="font-bold text-gray-900 text-base">{{ product.name }}</div>
        <div class="text-gray-400 text-xs mt-2">{{ product.description }}</div>
      </div>
    </td>
    <td class="py-5 px-7">
      <span :class="badgeClass(product.category)" class="px-4 py-1 rounded-full text-xs font-semibold">{{ product.category }}</span>
    </td>
    <td class="py-5 px-7 font-semibold text-gray-800 text-base">{{ product.price }}</td>
    <td class="py-5 px-7">
      <span class="flex items-center gap-2">
        <span :class="stockDotClass(product.stock)" class="w-3 h-3 rounded-full"></span>
        <span class="text-xs font-semibold text-gray-700">{{ product.stock }}</span>
      </span>
    </td>
    <td class="py-5 px-7 text-right">
      <button class="p-2 rounded-lg hover:bg-[#eef0fa]">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({ product: Object })
function badgeClass(category) {
  if (category === 'Electronics') return 'bg-blue-100 text-blue-700'
  if (category === 'Clothing') return 'bg-pink-100 text-pink-700'
  if (category === 'Home') return 'bg-green-100 text-green-700'
  return 'bg-gray-100 text-gray-700'
}
function stockDotClass(stock) {
  if (stock === 'In Stock') return 'bg-green-500'
  if (stock === 'Low Stock') return 'bg-orange-400'
  if (stock === 'Out of Stock') return 'bg-red-500'
  return 'bg-gray-300'
}
</script>
