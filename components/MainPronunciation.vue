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
      <GiveNameUserModal
        v-if="showNamePopup"
        @close = "showNamePopup = false"
        @save="(name) => {
          username.value = name
          showNamePopup.value = false
        }"/>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WordCard from '~/components/WordCard.vue'
import ResultModal from '~/components/ResultModal.vue'
import ShowScoresModal from '~/components/ShowScoresModal.vue'
import ShowEndScoresModal from '~/components/ShowEndScoresModal.vue'
import {words} from "@/utils/words";


const recordedText = ref(Array(words.value.length).fill(null))

/* COMPUTED SCORE -------------------------------------------------------- */
const totalScores = computed(() =>
  words.value.reduce((sum, w) => sum + w.score, 0)
)

/* MODAL STATE ----------------------------------------------------------- */
const showScores    = ref(false)
const showEndScores = ref(false)
const showPopup     = ref(false)
const username = ref('')
const showNamePopup = ref(true)
const popupData = ref({ word: {}, recordedText: '' })

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
  if (index + 1 === words.value.length) showEndScores.value = true
}
</script>
