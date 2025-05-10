<template>
  <div
    class="flex flex-col gap-2 p-4 rounded-xl shadow bg-white hover:shadow-lg transition"
  >
    <img src="../static/img_header.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl" />
    <p class="text-lg text-center mt-2 font-bold text-gray-800">{{ word.text }}</p>

    <p
      v-if="recordedText"
      class="text-sm text-gray-500 border border-dashed border-gray-300 rounded p-2"
    >
      {{ recordedText }}
    </p>

    <button
      class="mt-auto bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 transition"
      @click="$emit('open', index)"
    >
      Result
    </button>
  </div>
</template>

<script setup>
defineProps({
  word: { type: Object, required: true },
  recordedText: { type: String, default: '' },
  index: { type: Number, required: true }
})

defineEmits(['open'])
</script>
