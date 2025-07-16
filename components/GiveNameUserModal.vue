<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50" @click.self="$emit('close')">
    <div class="bg-white p-5 rounded-xl text-center w-full max-w-md mx-auto" @click.stop>

      <!-- Image -->
      <img :src="word.image" alt="Word Image" class="mx-auto mb-4" />



      <!-- Editable User Name Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1">Your Name:</label>
        <input
          v-model="userName"
          type="text"
          placeholder="Enter your name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <!-- Save Button -->
      <button
        @click="saveName"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Save
      </button>

      <!-- Close Button -->
      <div @click="$emit('close')" class="relative w-[130px] h-[61px] mx-auto mt-5 cursor-pointer">
        <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0" />
        <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
          Close
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  word: { type: Object, required: true },
  recordedText: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'save-name'])

const userName = ref('')

// Save handler


// part of code for trying{


// }
const saveName = () => {
  emit('save-name', userName.value)
}
</script>




