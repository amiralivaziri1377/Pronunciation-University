<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click.self="closeModal">
    <div class="bg-white p-5 rounded-xl text-center w-full max-w-md mx-auto" @click.stop>

      <!-- Editable User Name Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1">Give Your Name</label>
        <input
          v-model="localName"
          type="text"
          placeholder="Enter your name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <!-- Save Button -->
      <button
        @click="$emit('update:modelValue',localName)&& $emit('close')"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
// Define the props and emit events
import {ref} from "vue";

const props = defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue','close'])

const localName = ref(props.modelValue)



</script>
