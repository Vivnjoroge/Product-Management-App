<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 w-80">
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
      <div class="mt-4 flex justify-end gap-2">
        <button @click="$emit('cancel')" class="px-3 py-1 rounded border">Cancel</button>
        <button @click="$emit('confirm')" class="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ title: { type: String, default: 'Confirm' }, message: { type: String, default: 'Are you sure?' } })
</script>

<style scoped>
</style>
