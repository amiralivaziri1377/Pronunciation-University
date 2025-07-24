<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click.self="closeModal">
    <div class="bg-white p-5 rounded-xl text-center w-full max-w-md mx-auto" @click.stop>

      <!-- Editable User Name Input -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-1">Give Your Name</label>
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
    </div>
  </div>
</template>

<script setup>
// Define the props and emit events
import {ref} from "vue";

const props = defineProps({
  username: { type: String, default: "" }
})

// Local variable to hold the username entered by the user
const userName = ref(props.username)

// Define the events to be emitted
const emit = defineEmits(['save', 'close'])

// Method to emit the save event with the user's name
function saveName() {
  if (userName.value.trim()) {
    emit('save', userName.value)  // Emit the username entered by the user
    emit('close')  // Close the modal after saving
  } else {
    alert('Please enter your name!')  // Show an alert if the input is empty
  }
}

// Close the modal when clicked outside of it
function closeModal() {
  emit('close')
}
</script>
