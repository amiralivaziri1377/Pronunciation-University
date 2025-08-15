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
        :is-playing="word.isPlaying"
        :is-recording="word.isRecording"
        @open="openPopup(i)"
        @listen="playAudio(i)"
        @record="startRecording(i)"
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
        @export="exportData"
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
        @export="exportData"
        @close="showEndScores = false"
      />
      <GiveNameUserModal
        v-if="showNamePopup"
        @close = "showNamePopup = false"
        :phone = "personInfo.phone"
        @update-phone="handlePersonalPhone"
      />
    </Teleport>

    <!-- Pagination Controls -->
    <div class="flex justify-between mt-6">
      <button
        :disabled="currentPage === 0"
        @click="prevPage"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <span class="self-center">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages - 1"
        @click="nextPage"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WordCard from '~/components/WordCard.vue'
import ResultModal from '~/components/ResultModal.vue'
import ShowScoresModal from '~/components/ShowScoresModal.vue'
import ShowEndScoresModal from '~/components/ShowEndScoresModal.vue'
import * as XLSX from 'xlsx'


const words = ref([
  //A
  { text: "Araba", audio: "/audio/araba.mp3", image: "/images/Picture1.webp", score: null, visible: true,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Adalar", audio: "/audio/adalar.mp3", image: "/images/Picture2.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Sakız", audio: "/audio/sakiz.mp3", image: "/images/Picture3.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Lamba", audio: "/audio/lamba.mp3", image: "/images/Picture4.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //B
  { text: "Balık", audio: "/audio/balik.mp3", image: "/images/Picture5.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Sabun", audio: "/audio/sabun.mp3", image: "/images/Picture6.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Abla", audio: "/audio/abla.mp3", image: "/images/Picture7.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //C
  { text: "Eczane", audio: "/audio/eczane.mp3", image: "/images/Picture10.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Cam", audio: "/audio/cam.mp3", image: "/images/Picture8.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Çocuk", audio: "/audio/cocuk.mp3", image: "/images/Picture9.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //C.
  { text: "Çilek", audio: "/audio/cilek.mp3", image: "/images/Picture11.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Bıçak", audio: "/audio/bicak.mp3", image: "/images/Picture12.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Saç", audio: "/audio/sac.mp3", image: "/images/Picture13.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ağaçlar", audio: "/audio/agaclar.mp3", image: "/images/Picture14.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //E
  { text: "Elma", audio: "/audio/elma.mp3", image: "/images/Picture15.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Bebek", audio: "/audio/bebek.mp3", image: "/images/Picture16.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Anne", audio: "/audio/anne.mp3", image: "/images/Picture17.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //D
  { text: "Defter", audio: "/audio/defter.mp3", image: "/images/Picture18.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Dede", audio: "/audio/dede.mp3", image: "/images/Picture20.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ördek", audio: "/audio/ordek.mp3", image: "/images/Picture21.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Adres", audio: "/audio/adres.mp3", image: "/images/Picture22.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},


  //F
  { text: "Fare", audio: "/audio/fare.mp3", image: "/images/Picture23.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Künüfe", audio: "/audio/kunufe.mp3", image: "/images/Picture24.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Harf", audio: "/audio/harf.mp3", image: "/images/Picture25.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},


  //G
  { text: "Gül", audio: "/audio/gul.mp3", image: "/images/Picture26.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Rüzgar", audio: "/audio/ruzgar.mp3", image: "/images/Picture27.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Jaguar", audio: "/audio/jaguar.mp3", image: "/images/Picture28.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //G^
  { text: "Boğa", audio: "/audio/boga.mp3", image: "/images/Picture30.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Dağ", audio: "/audio/dag.mp3", image: "/images/Picture31.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Yağmur", audio: "/audio/yagmur.mp3", image: "/images/Picture32.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //H
  { text: "Halı", audio: "/audio/hali.mp3", image: "/images/Picture33.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "buhar", audio: "/audio/buhar.mp3", image: "/images/Picture34.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "kahve", audio: "/audio/kahve.mp3", image: "/images/Picture35.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ruh", audio: "/audio/ruh.mp3", image: "/images/Picture36.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //L
  { text: "kırmızı", audio: "/audio/kirmizi.mp3", image: "/images/Picture37.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Işık", audio: "/audio/isik.mp3", image: "/images/Picture38.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Tırnak", audio: "/audio/tirnak.mp3", image: "/images/Picture39.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ayı", audio: "/audio/ayi.mp3", image: "/images/Picture40.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //I
  { text: "iğne", audio: "/audio/igne.mp3", image: "/images/Picture41.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Polis", audio: "/audio/polis.mp3", image: "/images/Picture42.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Elbise", audio: "/audio/elbise.mp3", image: "/images/Picture44.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "kedi", audio: "/audio/kedi.mp3", image: "/images/Picture45.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //J
  { text: "Jaguar", audio: "/audio/jaguar.mp3", image: "/images/Picture28.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ajans", audio: "/audio/ajans.mp3", image: "/images/Picture46.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ejderha", audio: "/audio/ejderha.mp3", image: "/images/Picture47.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ruj", audio: "/audio/ruj.mp3", image: "/images/Picture49.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},


  //K
  { text: "köpek", audio: "/audio/kopek.mp3", image: "/images/Picture48.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Hırka", audio: "/audio/hirka.mp3", image: "/images/Picture50.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Tarak", audio: "/audio/tarak.mp3", image: "/images/Picture52.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Makyaj", audio: "/audio/makyaj.mp3", image: "/images/Picture53.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //L
  { text: "Limon", audio: "/audio/limon.mp3", image: "/images/Picture54.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Eldiven", audio: "/audio/eldiven.mp3", image: "/images/Picture55.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Zil", audio: "/audio/zil.mp3", image: "/images/Picture56.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Çilek", audio: "/audio/cilek.mp3", image: "/images/Picture11.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //M
  { text: "Makas", audio: "/audio/makas.mp3", image: "/images/Picture57.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Simit", audio: "/audio/simit.mp3", image: "/images/Picture58.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Şampuan", audio: "/audio/sampuan.mp3", image: "/images/Picture59.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Mum", audio: "/audio/mum.mp3", image: "/images/Picture60.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //N
  { text: "Nar", audio: "/audio/nar.mp3", image: "/images/Picture61.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Menekşe", audio: "/audio/menekse.mp3", image: "/images/Picture62.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Dondurma", audio: "/audio/dondurma.mp3", image: "/images/Picture63.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Soğan", audio: "/audio/sogan.mp3", image: "/images/Picture64.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Burun", audio: "/audio/burun.mp3", image: "/images/Picture65.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //O
  { text: "Oğlan", audio: "/audio/oglan.mp3", image: "/images/Picture66.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Robot", audio: "/audio/robot.mp3", image: "/images/Picture67.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Soğan", audio: "/audio/sogan.mp3", image: "/images/Picture64.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Dolap", audio: "/audio/dolap.mp3", image: "/images/Picture68.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Vazo", audio: "/audio/vazo.mp3", image: "/images/Picture69.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //Ö
  { text: "Öğretmen", audio: "/audio/ogretmen.mp3", image: "/images/Picture70.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Öğrenci", audio: "/audio/ogrenci.mp3", image: "/images/Picture71.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Göz", audio: "/audio/goz.mp3", image: "/images/Picture75.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},


  //P
  { text: "Parmak", audio: "/audio/parmak.mp3", image: "/images/Picture76.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "zıpla", audio: "/audio/zipla.mp3", image: "/images/Picture78.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Küpe", audio: "/audio/kupe.mp3", image: "/images/Picture79.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Kitap", audio: "/audio/kitap.mp3", image: "/images/Picture80.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //Ş
  { text: "Şeker", audio: "/audio/seker.mp3", image: "/images/Picture84.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Yeşil", audio: "/audio/yesil.mp3", image: "/images/Picture85.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Meşgul", audio: "/audio/mesgul.mp3", image: "/images/Picture86.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Diş", audio: "/audio/dis.mp3", image: "/images/Picture87.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //R
  { text: "Rüzgar", audio: "/audio/ruzgar.mp3", image: "/images/Picture27.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "park", audio: "/audio/park.mp3", image: "/images/Picture72.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "kurye", audio: "/audio/kurye.mp3", image: "/images/Picture73.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "tencere", audio: "/audio/tencere.mp3", image: "/images/Picture74.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "misafir", audio: "/audio/misafir.mp3", image: "/images/Picture77.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Robot", audio: "/audio/robot.mp3", image: "/images/Picture67.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //T
  { text: "Tren", audio: "/audio/tren.mp3", image: "/images/Picture88.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Çanta", audio: "/audio/canta.mp3", image: "/images/Picture89.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Teyze", audio: "/audio/teyze.mp3", image: "/images/Picture90.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Süt", audio: "/audio/sut.mp3", image: "/images/Picture91.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Sütlaç", audio: "/audio/sutlac.mp3", image: "/images/Picture92.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Simit", audio: "/audio/simit.mp3", image: "/images/Picture58.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //U
  { text: "Uçak", audio: "/audio/ucak.mp3", image: "/images/Picture93.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Muz", audio: "/audio/muz.mp3", image: "/images/Picture94.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Yumurta", audio: "/audio/yumurta.mp3", image: "/images/Picture95.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Soru", audio: "/audio/soru.mp3", image: "/images/Picture96.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Okumak", audio: "/audio/okumak.mp3", image: "/images/Picture97.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //Ü
  { text: "Ülke", audio: "/audio/ulke.mp3", image: "/images/Picture98.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Üflemek", audio: "/audio/uflemek.mp3", image: "/images/Picture99.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "kütüphane", audio: "/audio/kutuphane.mp3", image: "/images/Picture100.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Güzel", audio: "/audio/guzel.mp3", image: "/images/Picture101.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Güçlü", audio: "/audio/guclu.mp3", image: "/images/Picture102.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},


  //V
  { text: "Virgül", audio: "/audio/virgul.mp3", image: "/images/Picture103.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Meyve", audio: "/audio/meyve.mp3", image: "/images/Picture104.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "manav", audio: "/audio/manav.mp3", image: "/images/Picture105.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ev", audio: "/audio/ev.mp3", image: "/images/Picture106.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Tavşan", audio: "/audio/tavsan.mp3", image: "/images/Picture107.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //Y
  { text: "Boya", audio: "/audio/boya.mp3", image: "/images/Picture108.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Yaz", audio: "/audio/yaz.mp3", image: "/images/Picture109.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Köy", audio: "/audio/koy.mp3", image: "/images/Picture110.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Meydan", audio: "/audio/meydan.mp3", image: "/images/Picture114.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Yeşil", audio: "/audio/yesil.mp3", image: "/images/Picture85.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  //Z
  { text: "Göz", audio: "/audio/goz.mp3", image: "/images/Picture75.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Zürafa", audio: "/audio/zurafa.mp3", image: "/images/Picture111.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Sebze", audio: "/audio/sebze.mp3", image: "/images/Picture112.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Rüzgar", audio: "/audio/ruzgar.mp3", image: "/images/Picture27.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

  { text: "Sonbahar", audio: "/audio/sonbahar.mp3", image: "/images/Picture81.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Aslan", audio: "/audio/aslan.mp3", image: "/images/Picture82.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Kas", audio: "/audio/kas.mp3", image: "/images/Picture83.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},
  { text: "Ekmek", audio: "/audio/ekmek.mp3", image: "/images/Picture113.webp", score: null, visible: false,feedbackColor: "",isPlaying: false ,isRecording:false},

])


function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1
  }
}

const recordedText = ref(Array(words.value.length).fill(null))

/* COMPUTED SCORE -------------------------------------------------------- */
const totalScores = computed(() =>
  words.value.reduce((sum, w) => sum + w.score, 0)
)

// Export to Excel function
function exportData() {
  const data = words.value.map((word, index) => ({
    Word: word.text,
    Score: word.score,
    Name: userName.value,
    Phone : personInfo.value.phone
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Results')
  XLSX.writeFile(wb, `${userName.value}_results.xlsx`)
}

/* MODAL STATE ----------------------------------------------------------- */
const showScores    = ref(false)
const showEndScores = ref(false)
const showPopup     = ref(false)
const userName = ref('')
const personInfo = ref({phone : ''})
const showNamePopup = ref(true)
const popupData = ref({ word: {}, recordedText: '' })


const handlePersonalPhone = (phone) =>{
  personInfo.value.phone = phone
}

/* HANDLERS -------------------------------------------------------------- */
function openPopup (index) {
  if (!words.value[index]) {
    console.error('Word not found for index', index)
    return
  }
  if (!recordedText.value[index]) {
    alert('click on Record!')
    return
  }

  popupData.value.word         = words.value[index]
  popupData.value.recordedText = recordedText.value[index]
  showPopup.value = true
  showPopup.value = true
}
const closePopup = () => (showPopup.value = false)

const openScorePopup  = () => (showScores.value    = true)


/* AUDIO ----------------------------------------------------------------- */
function playAudio (index) {
  const { audio } = words.value[index]
  if (!process.client) return

  const player = new Audio(audio)
  words.value[index].isPlaying = true
  player.play()

  player.onended = () => {
    words.value[index].isPlaying = false
  }         /* HTMLMediaElement `ended` event :contentReference[oaicite:0]{index=0} */
}


/* RECORDING (Web Speech API) ------------------------------------------- */
function startRecording (index) {
  if (!process.client) return
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!Recognition) return alert('Speech recognition not supported in this browser.')

  const recognition = new Recognition()
  recognition.lang = 'tr-TR'
  words.value[index].isRecording = true
  recognition.start()

  recognition.onresult = e => {
    endOfGame(index)
    const transcript = e.results[0][0].transcript
    if (!transcript) {
      alert("transcript is null")
    }
    recordedText.value[index] = transcript
    //this.$set(this.recordedText, index, transcript);
    evaluatePronunciation(index, transcript)

  }

  const stop = () => { words.value[index].isRecording = false }
  recognition.onend   = stop     /* SpeechRecognition `end` event :contentReference[oaicite:1]{index=1} */
  recognition.onerror = err => {
    console.error(err);
    stop() ;
    alert('Speech recognition error.')
  }
}



/**
 * Evaluate a user’s pronunciation of a single word and update UI + score.
 * ──────────────────────────────────────────────────────────────────────
 * @param {number} index      Index of the word being evaluated
 * @param {string} transcript Raw transcript returned from Web-Speech API
 */


function evaluatePronunciation(index, transcript) {
  const word        = words.value[index];
  const targetWord  = word.text.trim().toLowerCase();
  const userWord    = (transcript ?? "").trim().toLowerCase();



    const maxLen = Math.max(targetWord.length, userWord.length)
    const result = Array.from({ length: maxLen }, (_, i) => ({
    letter: userWord[i] ?? '_',
    color : targetWord[i] === userWord[i] ? 'green' : 'red'
    }))

    recordedText.value[index] = result


    const correct = result.filter(l => l.color === 'green').length
    const accuracy = targetWord.length ? correct / targetWord.length : 0
    word.score     = Math.round(accuracy * 5)

    // go to next word
    if (accuracy === 1) {
      const next = words.value[index + 1]
      if (next) next.visible = true
    }
}


/* END OF GAME ----------------------------------------------------------- */
function endOfGame(index) {
  // Check if we have completed a multiple of 5 words
  if ((index + 1) % 5 === 0) {
    // Show the modal after every 5 words
    showEndScores.value = true;
  }
}
</script>
