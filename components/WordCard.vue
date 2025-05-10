<template>
  <div
    class="flex flex-col gap-2  rounded-2xl shadow bg-white hover:shadow-lg transition"
  >
    <img src="../static/img_header.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl" />
    <p class="text-center text-2xl lg:text-4xl text-green-600 mt-2 font-Kiddosy">{{ word.text }}</p>



    <p
      v-if="recordedText"
      class="text-sm text-gray-500 border border-dashed border-gray-300 rounded p-2"
    >
      {{ recordedText }}
    </p>
    <div id="buttons_section" class="flex justify-center space-x-4 mt-4">
      <div
        @click="$emit('listen', word.audio)"
        class="relative w-[130px] h-[61px] flex items-center justify-center cursor-pointer"
      >
        <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0" />
        <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
          Listen
        </div>
      </div>
    </div>


    <div
      @click="$emit('open', index) &&  word.visible"
      class="relative w-[150px] h-[85px] mx-auto mt-4 cursor-pointer">
      <img src="../static/yelloPlay.webp" alt="Not Found" class="absolute inset-0" />
      <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">Result</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  word: { type: Object, required: true },
  recordedText: { type: String, default: '' },
  index: { type: Number, required: true }
})

defineEmits(['open','listen'])
</script>
