<template>
  <!-- Popup Modal For End Score     -->
  <div class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-75" @click.self="$emit('close')">
    <div class="bg-white p-5 rounded-xl text-center" @click.stop>
      <h2 class="font-Kiddosy text-2xl text-blue-400 mb-4">Your End Score</h2>
      <p class="text-gray-600">You can finish the Game .  this is Your Main Score: <span class="font-Kiddosy text-gray-600 text-xl">{{ totalScores }}</span></p>
      <div @click="$emit('close')" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
        <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0"/>
        <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalScores: { type: String, default: '' },
})

defineEmits(['close'])
</script>
