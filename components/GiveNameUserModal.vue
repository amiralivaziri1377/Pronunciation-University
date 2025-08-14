<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click.self="closeModal">
    <div class="bg-white p-5 rounded-xl text-center w-full max-w-md mx-auto" @click.stop>

      <!-- Editable User Name Input -->
      <label class="block text-gray-700 font-semibold mb-1">Give Your Info</label>
      <div class="mb-4">

        <input
          v-model="localName"
          type="text"
          placeholder="Enter your first name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />


      </div>
      <div class="mb-4">
        <input
          v-model="localName"
          type="text"
          placeholder="Enter your last name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />


      </div>
      <div class="mb-4">
        <input
          v-model="localName"
          type="text"
          placeholder="Enter your phone number"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />


      </div>
      <div class="mb-4">
        <input
          v-model="localName"
          type="text"
          placeholder="Enter your age"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />


      </div>
      <select id="gender" name="gender" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        <option value="male">male</option>
        <option value="feMale">feMale</option>
      </select>

      <!-- Save Button -->
      <button
        @click="$emit('update:modelValue',localName)&& $emit('close')"
        class="bg-green-500 mt-1 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
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
