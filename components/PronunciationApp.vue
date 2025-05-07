


<script>
export default {
  data() {
    return {
      words: [
        { text: "Araba", audio: "/audio/araba.mp3", image: "/images/Picture1.webp", score: null, visible: true,feedbackColor: ""},
        { text: "Adalar", audio: "/audio/adalar.mp3", image: "/images/Picture2.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Sakız", audio: "/audio/sakız.mp3", image: "/images/Picture3.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Lamba", audio: "/audio/lamba.mp3", image: "/images/Picture4.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Balık", audio: "/audio/balık.mp3", image: "/images/Picture5.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Sabun", audio: "/audio/sabun.mp3", image: "/images/Picture6.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Abla", audio: "/audio/abla.mp3", image: "/images/Picture7.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Cam", audio: "/audio/cam.mp3", image: "/images/Picture8.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Çocuk", audio: "/audio/cocuk.mp3", image: "/images/Picture9.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Eczane", audio: "/audio/eczane.mp3", image: "/images/Picture10.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Çilek", audio: "/audio/cilek.mp3", image: "/images/Picture11.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Bıçak", audio: "/audio/bıçak.mp3", image: "/images/Picture12.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Saç", audio: "/audio/saç.mp3", image: "/images/Picture13.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ağaçlar", audio: "/audio/ağaçlar.mp3", image: "/images/Picture14.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Elma", audio: "/audio/elma.mp3", image: "/images/Picture15.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Bebek", audio: "/audio/bebek.mp3", image: "/images/Picture16.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Anne", audio: "/audio/anne.mp3", image: "/images/Picture17.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Defter", audio: "/audio/defter.mp3", image: "/images/Picture18.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Dede", audio: "/audio/dede.mp3", image: "/images/Picture20.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ördek", audio: "/audio/ordek.mp3", image: "/images/Picture21.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Adres", audio: "/audio/adres.mp3", image: "/images/Picture22.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Fare", audio: "/audio/fare.mp3", image: "/images/Picture23.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Künüfe", audio: "/audio/künüfe.mp3", image: "/images/Picture24.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Harf", audio: "/audio/harf.mp3", image: "/images/Picture25.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Gül", audio: "/audio/gül.mp3", image: "/images/Picture26.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Rüzgar", audio: "/audio/rüzgar.mp3", image: "/images/Picture27.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Jaguar", audio: "/audio/jaguar.mp3", image: "/images/Picture28.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Boğa", audio: "/audio/boğa.mp3", image: "/images/Picture30.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Dağ", audio: "/audio/dağ.mp3", image: "/images/Picture31.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Yağmur", audio: "/audio/yağmur.mp3", image: "/images/Picture32.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Halı", audio: "/audio/halı.mp3", image: "/images/Picture33.webp", score: null, visible: false,feedbackColor: ""},
        { text: "buhar", audio: "/audio/buhar.mp3", image: "/images/Picture34.webp", score: null, visible: false,feedbackColor: ""},
        { text: "kahve", audio: "/audio/kahve.mp3", image: "/images/Picture35.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ruh", audio: "/audio/ruh.mp3", image: "/images/Picture36.webp", score: null, visible: false,feedbackColor: ""},
        { text: "kırmızı", audio: "/audio/kırmızı.mp3", image: "/images/Picture37.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Işık", audio: "/audio/işık.mp3", image: "/images/Picture38.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Tırnak", audio: "/audio/tırnak.mp3", image: "/images/Picture39.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ayı", audio: "/audio/ayı.mp3", image: "/images/Picture40.webp", score: null, visible: false,feedbackColor: ""},
        { text: "iğne", audio: "/audio/iğne.mp3", image: "/images/Picture41.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Polis", audio: "/audio/polis.mp3", image: "/images/Picture42.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Elbise", audio: "/audio/elbise.mp3", image: "/images/Picture44.webp", score: null, visible: false,feedbackColor: ""},
        { text: "kedi", audio: "/audio/kedi.mp3", image: "/images/Picture45.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ajans", audio: "/audio/ajans.mp3", image: "/images/Picture46.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ejderha", audio: "/audio/ejderha.mp3", image: "/images/Picture47.webp", score: null, visible: false,feedbackColor: ""},
        { text: "köpek", audio: "/audio/köpek.mp3", image: "/images/Picture48.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ruj", audio: "/audio/ruj.mp3", image: "/images/Picture49.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Hırka", audio: "/audio/hırka.mp3", image: "/images/Picture50.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Tarak", audio: "/audio/tarak.mp3", image: "/images/Picture52.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Makyaj", audio: "/audio/makyaj.mp3", image: "/images/Picture53.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Limon", audio: "/audio/limon.mp3", image: "/images/Picture54.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Eldiven", audio: "/audio/eldiven.mp3", image: "/images/Picture55.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Zil", audio: "/audio/zil.mp3", image: "/images/Picture56.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Makas", audio: "/audio/makas.mp3", image: "/images/Picture57.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Simit", audio: "/audio/simit.mp3", image: "/images/Picture58.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Şampuan", audio: "/audio/sampuan.mp3", image: "/images/Picture59.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Mum", audio: "/audio/mum.mp3", image: "/images/Picture60.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Nar", audio: "/audio/nar.mp3", image: "/images/Picture61.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Menekşe", audio: "/audio/menekşe.mp3", image: "/images/Picture62.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Dondurma", audio: "/audio/dondurma.mp3", image: "/images/Picture63.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Soğan", audio: "/audio/soğan.mp3", image: "/images/Picture64.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Burun", audio: "/audio/burun.mp3", image: "/images/Picture65.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Oğlan", audio: "/audio/oğlan.mp3", image: "/images/Picture66.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Robot", audio: "/audio/robot.mp3", image: "/images/Picture67.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Dolap", audio: "/audio/dolap.mp3", image: "/images/Picture68.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Vazo", audio: "/audio/vazo.mp3", image: "/images/Picture69.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Öğretmen", audio: "/audio/oğretmen.mp3", image: "/images/Picture70.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Öğrenci", audio: "/audio/oğrenci.mp3", image: "/images/Picture71.webp", score: null, visible: false,feedbackColor: ""},
        { text: "park", audio: "/audio/park.mp3", image: "/images/Picture72.webp", score: null, visible: false,feedbackColor: ""},
        { text: "kurye", audio: "/audio/kurye.mp3", image: "/images/Picture73.webp", score: null, visible: false,feedbackColor: ""},
        { text: "tencere", audio: "/audio/tencere.mp3", image: "/images/Picture74.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Göz", audio: "/audio/göz.mp3", image: "/images/Picture75.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Parmak", audio: "/audio/parmak.mp3", image: "/images/Picture76.webp", score: null, visible: false,feedbackColor: ""},
        { text: "misafir", audio: "/audio/misafir.mp3", image: "/images/Picture77.webp", score: null, visible: false,feedbackColor: ""},
        { text: "zıpla", audio: "/audio/zıpla.mp3", image: "/images/Picture78.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Küpe", audio: "/audio/küpe.mp3", image: "/images/Picture79.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Kitap", audio: "/audio/kitap.mp3", image: "/images/Picture80.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Sonbahar", audio: "/audio/sonbahar.mp3", image: "/images/Picture81.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Aslan", audio: "/audio/aslan.mp3", image: "/images/Picture82.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Kas", audio: "/audio/kas.mp3", image: "/images/Picture83.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Şeker", audio: "/audio/seker.mp3", image: "/images/Picture84.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Yeşil", audio: "/audio/yeşil.mp3", image: "/images/Picture85.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Meşgul", audio: "/audio/meşgul.mp3", image: "/images/Picture86.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Diş", audio: "/audio/diş.mp3", image: "/images/Picture87.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Tren", audio: "/audio/tren.mp3", image: "/images/Picture88.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Çanta", audio: "/audio/canta.mp3", image: "/images/Picture89.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Teyze", audio: "/audio/teyze.mp3", image: "/images/Picture90.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Süt", audio: "/audio/süt.mp3", image: "/images/Picture91.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Sütlaç", audio: "/audio/sütlaç.mp3", image: "/images/Picture92.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Uçak", audio: "/audio/uçak.mp3", image: "/images/Picture93.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Muz", audio: "/audio/muz.mp3", image: "/images/Picture94.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Yumurta", audio: "/audio/yumurta.mp3", image: "/images/Picture95.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Soru", audio: "/audio/soru.mp3", image: "/images/Picture96.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Okumak", audio: "/audio/okumak.mp3", image: "/images/Picture97.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ülke", audio: "/audio/ulke.mp3", image: "/images/Picture98.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Üflemek", audio: "/audio/uflemek.mp3", image: "/images/Picture99.webp", score: null, visible: false,feedbackColor: ""},
        { text: "kütüphane", audio: "/audio/kütüphane.mp3", image: "/images/Picture100.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Güzel", audio: "/audio/güzel.mp3", image: "/images/Picture101.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Güçlü", audio: "/audio/güçlü.mp3", image: "/images/Picture102.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Virgül", audio: "/audio/virgül.mp3", image: "/images/Picture103.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Meyve", audio: "/audio/meyve.mp3", image: "/images/Picture104.webp", score: null, visible: false,feedbackColor: ""},
        { text: "manav", audio: "/audio/manav.mp3", image: "/images/Picture105.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ev", audio: "/audio/ev.mp3", image: "/images/Picture106.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Tavşan", audio: "/audio/tavşan.mp3", image: "/images/Picture107.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Boya", audio: "/audio/boya.mp3", image: "/images/Picture108.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Yaz", audio: "/audio/yaz.mp3", image: "/images/Picture109.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Köy", audio: "/audio/köy.mp3", image: "/images/Picture110.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Zürafa", audio: "/audio/zürafa.mp3", image: "/images/Picture111.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Sebze", audio: "/audio/sebze.mp3", image: "/images/Picture112.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Ekmek", audio: "/audio/ekmek.mp3", image: "/images/Picture113.webp", score: null, visible: false,feedbackColor: ""},
        { text: "Meydan", audio: "/audio/meydan.mp3", image: "/images/Picture114.webp", score: null, visible: false,feedbackColor: ""},

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
        recognition.lang = "tr-TR";
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
      this.popupData.recordedText = this.recordedText[index] || "";
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
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
            <p v-if="recordedText[index]" class="recorded-text flex space-x-1 font-semibold text-center text-2xl">
               <span v-for="(char, charIndex) in recordedText[index]"  :key="charIndex" :style="{ color: char.color }">
                   {{ char.letter }}
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



                <p class="text-gray-600 text-center">
                  Your Voice:
                  <span class="font-Kiddosy text-gray-600 text-xl">
                    <span v-for="(char, charIndex) in popupData.recordedText" :key="charIndex" :style="{ color: char.color }">
                      {{ char.letter }}
                    </span>
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
          <div class="bg-white p-5 rounded-xl text-center" @click.stop>
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
