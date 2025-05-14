<template>
  <div>
    <img src="../static/img_header.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl" />




    <p v-if="recordedText && recordedText.length"
       class="text-2xl text-center  font-Kiddosy my-2 ">
      <span v-for="(char, cIdx) in recordedText" :key="cIdx" :style="{ color: char.color }">
        {{ char.letter }}
      </span>
    </p>
    <div id="buttons_section" class="flex justify-center space-x-4 mt-4">
      <!-- LISTEN -->
      <div @click="$emit('listen')"
           class="relative w-[130px] h-[61px] flex items-center justify-center cursor-pointer">
        <img
          :src="isPlaying
                ? '/orangeButtonIcon.webp'
                : '/greenButtonIcon.webp'"
          alt="listenBtn"
          class="w-full h-full object-cover absolute inset-0" />
        <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
          Listen
        </div>
      </div>

      <!-- RECORD -->
      <div @click="$emit('record')"
           class="relative w-[130px] h-[61px] flex items-center justify-center cursor-pointer">
        <img
          :src="isRecording
                ? 'redButtonIcon.webp'
                : '/greenButtonIcon.webp'"
          alt="recordBtn"
          class="w-full h-full object-cover absolute inset-0" />
        <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
          Record
        </div>
      </div>
    </div>


    <div
      @click="$emit('open', index)"
      class="relative w-[150px] h-[85px] mx-auto mt-4 cursor-pointer">
      <img src="../static/yelloPlay.webp" alt="Not Found" class="absolute inset-0" />
      <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">Result</div>
    </div>
  </div>
</template>

<script setup>


defineProps({
  word: { type: Object, required: true },
  // this is already “that word’s letters array”, default empty
  recordedText: { type: Array, default: () => [] },
  index: { type: Number, required: true },
  isPlaying   : Boolean,
  isRecording : Boolean,
})

defineEmits(['open','listen','record'])
</script>
