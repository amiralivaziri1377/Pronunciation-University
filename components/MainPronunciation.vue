<template>
  <div class="bg-[#f5a5d0] p-6">
    <!-- WORD CARDS -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <WordCard
        v-for="(word, i) in words"
        :key="i"
        :word="word"
        :recorded-text="recordedText[i]"
        :index="i"
        @open="openPopup"
        @listen="playAudio"
        @record="startRecording"
        :class="word.visible
          ? 'shadow-2xl bg-white rounded-2xl'
          : 'opacity-50 cursor-not-allowed shadow-2xl bg-white rounded-2xl pointer-events-none'"
      />
    </div>

    <!-- RESULT MODAL -->
    <Teleport to="#teleports">
      <ResultModal
        v-if="showPopup"
        :word="popupData.word"
        :recorded-text="popupData.recordedText"
        @close="closePopup"
      />
    </Teleport>

    <!-- SCORE BUTTON -->
    <button
      @click="openScorePopup"
      class="fixed bottom-10 right-10 bg-blue-500 p-4 rounded-full text-white text-2xl font-Kiddosy"
    >
      Scores
    </button>

    <!-- SHOW SCORES -->
    <Teleport to="#teleports">
      <ShowScoresModal
        v-if="showScores"
        :total-scores="totalScores"
        @close="showScores = false"
      />
      <ShowEndScoresModal
        v-if="showEndScores"
        :total-scores="totalScores"
        @close="showEndScores = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WordCard from '~/components/WordCard.vue'
import ResultModal from '~/components/ResultModal.vue'
import ShowScoresModal from '~/components/ShowScoresModal.vue'
import ShowEndScoresModal from '~/components/ShowEndScoresModal.vue'

/* DATA ------------------------------------------------------------------ */
const words = ref([
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
  /* ... */
])

const recordedText = ref(Array(words.value.length).fill(''))

/* COMPUTED SCORE -------------------------------------------------------- */
const totalScores = computed(() =>
  words.value.reduce((sum, w) => sum + w.score, 0)
)

/* MODAL STATE ----------------------------------------------------------- */
const showScores    = ref(false)
const showEndScores = ref(false)
const showPopup     = ref(false)
const popupData = ref({ word: {}, recordedText: '' })

/* HANDLERS -------------------------------------------------------------- */
function openPopup (index) {
  popupData.value.word         = words.value[index]
  popupData.value.recordedText = recordedText.value[index]
  showPopup.value = true
}
const closePopup = () => (showPopup.value = false)

const openScorePopup  = () => (showScores.value    = true)


/* AUDIO ----------------------------------------------------------------- */
function playAudio (url) {
  if (process.client) new Audio(url).play()
}

/* RECORDING (Web Speech API) ------------------------------------------- */
function startRecording (index) {
  if (!process.client) return
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Recognition) return alert('Speech recognition not supported in this browser.')

  const recognition = new Recognition()
  recognition.lang = 'tr-TR'
  recognition.start()

  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript
    recordedText.value[index] = transcript
    evaluatePronunciation(index, transcript)
    endOfGame(index)
  }

  recognition.onerror = err => {
    console.error(err)
    alert('Speech recognition error.')
  }
}

/* PRONUNCIATION SCORE --------------------------------------------------- */
function evaluatePronunciation (index, transcript) {
  const target = words.value[index].text.toLowerCase()
  const user   = transcript.toLowerCase()
  words.value[index].score = target === user ? 5 : 0
  if (target === user && words.value[index + 1]) words.value[index + 1].visible = true
}

/* END OF GAME ----------------------------------------------------------- */
function endOfGame (index) {
  if (index + 1 === words.value.length) showEndScores.value = true
}
</script>
