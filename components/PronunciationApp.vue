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
    <div class="container mx-auto p-4">
      <h1 class="text-4xl my-8 text-center">Learn Pronunciation</h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-6  gap-6">
        <div v-for="(word, index) in words" :key="index" class="shadow-2xl  rounded-2xl mt-6">
          <img src="../static/images/sample_voice.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl">
          <div class="flex-col p-5">
            <p class="text-center text-2xl text-gray-600 font-semibold">{{ word.text }}</p>
            <div id="buttons_section" class="flex justify-center space-x-2 mt-4">
              <!-- Play Pronunciation -->
              <button @click="playAudio(word.audio)" class="rounded shadow-2xl bg-black p-1 bg-opacity-10">
                🔊 Listen to Voice
              </button>

              <!-- Record Voice -->
              <button @click="startRecording(index)" class="rounded shadow-2xl bg-black p-1 bg-opacity-10">
                🎙 Record Your Voice
              </button>
            </div>
            <p v-if="recordedText[index]" class="recorded-text">
              You said: {{ recordedText[index] }}
            </p>

            <!-- Popup Button -->
            <div id="viewDetails_Section" class="flex justify-center mt-4">
              <button @click="openPopup(word, index)" class="rounded bg-gray-800 text-white py-2 px-4">
                See Result
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Popup Modal -->

    </div>
    <div v-if="showPopup" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click="closePopup">
      <div class="bg-white p-5 rounded-xl text-center" @click.stop>
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
</style>
