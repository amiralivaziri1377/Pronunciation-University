<script>
export default {
  data() {
    return {
      words: [
        {
          text: "Apple",
          audio: "/audio/apple.mp3",
          image: "/images/apple.png",
        },
        {
          text: "Banana",
          audio: "/audio/banana.mp3",
          image: "/images/banana.png",
        },
      ],
      recordedText: {}, // Store transcriptions for each word
      showPopup: false,
      popupData: { word: {}, recordedText: "" },
    };
  },
  methods: {
    playAudio(audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    },
    startRecording(index) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();
      recognition.onresult = (event) => {
        this.$set(this.recordedText, index, event.results[0][0].transcript);
      };
      recognition.onerror = (error) => {
        console.error("Speech Recognition Error:", error);
      };
    },
    openPopup(word, index) {
      this.popupData.word = word;
      this.popupData.recordedText = this.recordedText[index] || "No input yet";
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<template>
  <div class="pronunciation-app">
    <h1 class="title">Learn Pronunciation</h1>
    <div v-for="(word, index) in words" :key="index" class="word-item">
      <p class="word">{{ word.text }}</p>

      <!-- Play Pronunciation -->
      <button @click="playAudio(word.audio)" class="play-button">
        🔊 Play
      </button>

      <!-- Record Voice -->
      <button @click="startRecording(index)" class="record-button">
        🎙 Record
      </button>
      <p v-if="recordedText[index]" class="recorded-text">
        You said: {{ recordedText[index] }}
      </p>

      <!-- Popup Button -->
      <button @click="openPopup(word, index)" class="popup-button">
        View Details
      </button>
    </div>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h2>{{ popupData.word.text }}</h2>
        <img :src="popupData.word.image" alt="Word Image" />
        <p>Correct Pronunciation: {{ popupData.word.text }}</p>
        <p>Your Voice: {{ popupData.recordedText }}</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<style>
  .pronunciation-app {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  .word-item {
    margin: 20px 0;
  }
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
</style>
