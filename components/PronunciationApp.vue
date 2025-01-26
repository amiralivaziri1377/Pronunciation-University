


<script>
export default {
  data() {
    return {
      words: [
        { text: "apple", audio: "/audio/apple.mp3", image: "/images/apple.png", score: null, visible: true,feedbackColor: ""},
        { text: "banana", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample3", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample4", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample5", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample6", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample7", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
        { text: "sample8", audio: "/audio/banana.mp3", image: "/images/banana.png", score: null, visible: false,feedbackColor: ""},
      ],
      recordedText: {},
      showPopup: false,
      showScores: false,
      showEndScores : false,
      popupData: { word: {}, recordedText: "" },
    };
  },
  computed: {
    // Compute the total score by adding the score of visible words
    totalScore() {
      return this.words
        .filter(word => word.visible) // Only include visible words
        .reduce((sum, word) => sum + word.score, 0); // Sum their scores
    },


  },
  methods: {
    playAudio(audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    },
    startRecording(index) {
      if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      try {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        console.log(this.words.length)

        recognition.onresult = (event) => {
          this.EndOfGame(index);
          const transcript = event.results[0][0].transcript;
          this.$set(this.recordedText, index, transcript);
          this.evaluatePronunciation(index, transcript);

        };

        recognition.onerror = (error) => {
          console.error("Speech Recognition Error:", error);
          alert("An error occurred with speech recognition.");
        };
      } catch (err) {
        console.error("Speech Recognition Initialization Error:", err);
        alert("An error occurred while initializing speech recognition.");
      }
    },
    evaluatePronunciation(index, transcript) {
      const word = this.words[index];
      const targetWord = word.text.toLowerCase();
      const userWord = transcript.toLowerCase();

      // Compare letter by letter
      const result = [];
      const maxLength = Math.max(targetWord.length, userWord.length);

      for (let i = 0; i < maxLength; i++) {
        if (targetWord[i] === userWord[i]) {
          result.push({ letter: userWord[i] || "", color: "green" });
        } else {
          result.push({ letter: userWord[i] || "_", color: "red" });
        }
      }

      this.$set(this.recordedText, index, result); // Save comparison result
      word.score = targetWord === userWord ? 5 : 0; // Assign score based on match

      // Make the next word visible if correct
      if (targetWord === userWord) {
        const nextWord = this.words[index + 1];
        if (nextWord) nextWord.visible = true;
      }
    },

    EndOfGame(index){
      if (index + 1 === this.words.length){
        this.showEndScores = true

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

    getLetters(recordedText){
      return  recordedText.map(item => item.letter).join('');
    }


  },
};

</script>


<template>
  <div id="Pronunciation">
    <div class="container mx-auto p-4 ">
      <h1 class="lg:text-6xl text-3xl font-Kiddosy text-gray-600 my-8 text-center">Pronunciation</h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 gap-6">
        <div
          v-for="(word, index) in words"
          :key="index"
          :class="{
            'opacity-50 cursor-not-allowed shadow-2xl  bg-white rounded-2xl pointer-events-none': !word.visible,
            'shadow-2xl bg-white rounded-2xl ': word.visible,
          }"
        >
          <img src="../static/img_header.webp" alt="imageNotFound" class="object-cover top-0 rounded-t-2xl" />
          <div class="flex-col p-5">
            <p class="text-center font-Kiddosy text-4xl text-green-600">{{ word.text }}</p>
            <div id="buttons_section" class="flex justify-center space-x-4 mt-4">
              <!-- Play Pronunciation -->
              <div
                @click="word.visible && playAudio(word.audio)"
                class="relative w-[130px] h-[61px] flex items-center justify-center cursor-pointer"
              >
                <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0" />
                <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
                  Listen
                </div>
              </div>

              <!-- Record Voice -->
              <div
                @click="word.visible && startRecording(index)"
                class="relative w-[130px] h-[61px] flex items-center justify-center cursor-pointer"
              >
                <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0" />
                <div class="absolute inset-0 mb-1 text-xl flex items-center justify-center text-white font-Kiddosy">
                  Record
                </div>
              </div>
            </div>
            <p v-if="recordedText[index]" class="recorded-text flex space-x-1 font-semibold">
               <span v-for="(char, charIndex) in recordedText[index]"  :key="charIndex" :style="{ color: char.color }">
                   {{ char.letter }}
                 <span>recordedText[index]</span>
              </span>
            </p>


            <div
              @click="word.visible && openPopup(word, index)"
              class="relative w-[150px] h-[85px] mx-auto mt-4 cursor-pointer"
            >
              <img src="../static/yelloPlay.webp" alt="Not Found" class="absolute inset-0" />
              <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">Result</div>
            </div>

            <!-- Open Popup-->
            <div v-if="showPopup" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50" @click="closePopup">
              <div class="bg-white p-5 rounded-xl text-center" @click.stop>
                <p class="font-Kiddosy text-2xl text-blue-400">{{ popupData.word.text }}</p>
                <img :src="popupData.word.image" alt="Word Image" />
                <p class="text-gray-600">Correct Pronunciation : <span class="font-Kiddosy text-gray-600 text-xl">{{ popupData.word.text }}</span> </p>


                <!--
                <p class="text-gray-600">
                  Your Voice :
                  <span class="font-Kiddosy text-gray-600 text-xl">
                    {{ getLetters(popupData.recordedText)}}
                  </span>
                </p>
                 -->

                <p v-if="this.popupData.recordedText" class="recorded-text flex space-x-1 font-semibold">
                  <span v-for="(char, charIndex) in this.popupData.recordedText"  :key="charIndex" :style="{ color: char.color }">
                   {{ char.letter }}
                  </span>
                </p>




                <div @click="closePopup" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
                  <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full  object-cover absolute inset-0"/>
                  <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View Scores Button -->
      <div
        @click="showScores = true"
        class="fixed bottom-10 right-10 bg-blue-500  p-4 rounded-full text-white text-2xl font-Kiddosy cursor-pointer"
      >
        Scores
      </div>

      <!-- Popup Modal for showing total score -->
      <div v-if="showScores" class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-75" @click="showScores = false">
        <div class="bg-white p-5 rounded-xl text-center" @click.stop>
          <h2 class="font-Kiddosy text-2xl text-blue-400 mb-4">Your Score</h2>
          <p class="text-gray-600">Total Score: <span class="font-Kiddosy text-gray-600 text-xl">{{ totalScore }}</span></p>
          <div @click="showScores = false" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
            <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0"/>
            <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
              Close
            </div>
          </div>
        </div>
      </div>

      <!-- Popup Modal For End Score     -->
      <div v-if="showEndScores" class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-75" @click="showEndScores = false">
          <div class="bg-white p-5 rounded-xl text-center"@click.stop>
            <h2 class="font-Kiddosy text-2xl text-blue-400 mb-4">Your End Score</h2>
            <p class="text-gray-600">You can finish the Game .  this is Your Main Score: <span class="font-Kiddosy text-gray-600 text-xl">{{ totalScore }}</span></p>
            <div @click="showEndScores = false" class="relative w-[130px] h-[61px] mx-auto cursor-pointer">
              <img src="../static/greenButtonIcon.webp" alt="Not Found" class="w-full h-full object-cover absolute inset-0"/>
              <div class="absolute inset-0 mb-1 text-2xl text-center mt-3 text-white font-Kiddosy">
                Close
              </div>
            </div>
          </div>
      </div>


    </div>
  </div>
</template>


<style scoped>
/* Add custom styles here */
</style>
