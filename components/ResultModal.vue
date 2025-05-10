<template>
  <!-- پوشش تیرهٔ پشت مودال -->
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <!-- خودِ مودال -->
    <div
      class="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-6"
    >
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        {{ word.text }}
      </h2>

      <p class="mb-4 text-gray-600">
        <span class="font-medium">تلفظ شما:</span>
        {{ recordedText || '—' }}
      </p>

      <audio :src="word.audio" controls class="w-full" />

      <!-- دکمهٔ بستن -->
      <button
        class="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition"
        @click="$emit('close')"
      >
        بستن
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  word: { type: Object, required: true },
  recordedText: { type: String, default: '' }
})

defineEmits(['close'])
</script>
