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
      // Check if SpeechRecognition is supported
      if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      try {
        // Initialize the SpeechRecognition object
        const recognition = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();
        recognition.lang = "en-US"; // Set language
        recognition.interimResults = false; // Get only final results
        recognition.maxAlternatives = 1; // Limit to one best result

        // Start recognition
        recognition.start();

        recognition.onresult = (event) => {
          // Get the recognized text
          const transcript = event.results[0][0].transcript;
          this.$set(this.recordedText, index, transcript);
        };

        recognition.onerror = (error) => {
          // Handle specific errors
          console.error("Speech Recognition Error:", error);
          switch (error.error) {
            case "no-speech":
              alert("No speech was detected. Please try again.");
              break;
            case "audio-capture":
              alert("No microphone was detected. Please check your microphone settings.");
              break;
            case "not-allowed":
              alert(
                "Permission to use the microphone is denied. Please allow microphone access."
              );
              break;
            default:
              alert("An unknown error occurred. Please try again.");
              break;
          }
        };

        recognition.onend = () => {
          console.log("Speech recognition ended.");
        };
      } catch (err) {
        console.error("Speech Recognition Initialization Error:", err);
        alert("An error occurred while initializing speech recognition.");
      }
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
  <div class="Pronunciation">
    <div class="container mx-auto">
      <h1 class="text-4xl my-8 text-center">Learn Pronunciation</h1>
      <div class="grid grid-cols-2 lg:grid-cols-4 lg:gap-6  gap-4">
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
      </div>

      <!-- Popup Modal -->

    </div>
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
