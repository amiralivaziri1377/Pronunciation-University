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
  <div id="Pronunciation" >
    <div class="container mx-auto p-4">
      <h1 class="lg:text-6xl text-3xl font-Kiddosy text-green-600 my-8 text-center">Pronunciation</h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 gap-6">
        <div v-for="(word, index) in words" :key="index" class="shadow-2xl bg-white rounded-2xl mt-6">
          <img src="../static/img_header.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl">
          <div class="flex-col p-5">
            <p class="text-center font-Kiddosy text-4xl text-green-600">{{ word.text }}</p>
            <div id="buttons_section" class="flex justify-center space-x-4 mt-4">
              <!-- Play Pronunciation -->
              <div @click="playAudio(word.audio)" class="relative w-[130px] h-[61px]  flex items-center justify-center cursor-pointer">
                <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0"/>
                <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
                  Listen
                </div>
              </div>

              <!-- Record Voice -->
              <div @click="startRecording(index)" class="relative w-[130px] h-[61px]  flex items-center justify-center cursor-pointer">
                <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full  object-cover absolute inset-0"/>
                <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
                  Record
                </div>
              </div>
            </div>
            <p v-if="recordedText[index]" class="recorded-text">
              You said: {{ recordedText[index] }}
            </p>

            <!-- Popup Button -->
<!--            <div id="viewDetails_Section" class="flex justify-center mt-2 relative" @click="openPopup(word, index)">-->
<!--              <img src="../static/yelloPlay.webp" alt="NotFound" class="w-36 absolute inset-0" />-->
<!--              <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">-->
<!--                Play-->
<!--              </div>-->
<!--            </div>-->
            <div @click="openPopup(word, index)" class="relative w-[150px] h-[85px]  mx-auto mt-4 cursor-pointer">
              <img src="../static/yelloPlay.webp" alt="Not Found" class="absolute inset-0"/>
              <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
                Play
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popup Modal -->
    </div>
    <div v-if="showPopup" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click="closePopup">
      <div class="bg-white p-5 rounded-xl text-center" @click.stop>
        <p class="font-Kiddosy text-2xl text-blue-400">{{ popupData.word.text }}</p>
        <img :src="popupData.word.image" alt="Word Image" />
        <p class="text-gray-600">Correct Pronunciation : <span class="font-Kiddosy text-gray-600 text-xl">{{ popupData.word.text }}</span> </p>
        <p class="text-gray-600">Your Voice :<span class="font-Kiddosy text-gray-600 text-xl"> {{ popupData.recordedText }}</span> </p>
        <div @click="closePopup" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
          <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full  object-cover absolute inset-0"/>
          <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
            Close
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
</style>
