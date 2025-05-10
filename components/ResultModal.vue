<template>
  <div  class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50" @click.self="$emit('close')">
    <div class="bg-white p-5 rounded-xl text-center" @click.stop>
      <p class="font-Kiddosy text-2xl text-blue-400">{{ word.text }}</p>
      <img :src="word.image" alt="Word Image" />
      <p class="text-gray-600">Correct Pronunciation : <span class="font-Kiddosy text-gray-600 text-xl">{{ word.text }}</span> </p>



      <p class="text-gray-600 text-center">
        Your Voice:
        <span class="font-Kiddosy text-gray-600 text-xl">
                    <span v-for="(char, charIndex) in recordedText" :key="charIndex" :style="{ color: char.color }">
                      {{ char.letter }}
                    </span>
                  </span>
      </p>

      <div @click="$emit('close')" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
        <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full  object-cover absolute inset-0"/>
        <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
          Close
        </div>
      </div>
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
