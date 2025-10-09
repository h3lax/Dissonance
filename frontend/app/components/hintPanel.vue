<script setup lang="ts">
import { useHint } from '~/composables/useHint'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

type Room = { id: number; name: string }

const props = withDefaults(defineProps<{ lobbyId?: string }>(), { lobbyId: 'L-TEST' })

const rooms = ref<Room[]>([])
const selectedRoomId = ref<number | null>(null)
const question = ref('')
const hint = ref('')
const msg = ref('')

const { askHint, loading, remaining, remainingLabel, loadCooldown } = useHint()

const currentRoom = computed(() => rooms.value.find(r => r.id === selectedRoomId.value))
const cacheKey = computed(() => `hintCache:${props.lobbyId}:${selectedRoomId.value || 'X'}`)

function loadCache() {
  if (!process.client) return
  try {
    const raw = localStorage.getItem(cacheKey.value)
    if (!raw) return
    const data = JSON.parse(raw)
    if (data?.q) question.value = data.q
    if (data?.h) hint.value = data.h
  } catch {}
}

function saveCache() {
  if (!process.client) return
  localStorage.setItem(cacheKey.value, JSON.stringify({ q: question.value, h: hint.value }))
}

function clearCache() {
  if (process.client) localStorage.removeItem(cacheKey.value)
}

watch([question, hint], saveCache)
watch(selectedRoomId, () => {
  loadCache()
  if (process.client) localStorage.setItem(`hintSelectedRoom:${props.lobbyId}`, String(selectedRoomId.value))
})
watch(remaining, sec => {
  if (sec === 0) clearCache()
})

onMounted(async () => {
  loadCooldown(props.lobbyId!)
  const res = await $fetch<{ rooms: Room[] }>('/api/rooms')
  rooms.value = res.rooms || []

  if (process.client) {
    const saved = localStorage.getItem(`hintSelectedRoom:${props.lobbyId}`)
    if (saved) selectedRoomId.value = Number(saved)
  }

  loadCache()
})

async function demanderIndice() {
  msg.value = ''
  hint.value = ''
  saveCache()

  if (!selectedRoomId.value) {
    msg.value = 'Choisis ta salle avant de demander un indice.'
    return
  }

  const res = await askHint({
    lobbyId: props.lobbyId!,
    roomId: selectedRoomId.value,
    question: question.value,
  })

  if (res.ok) {
    hint.value = res.hint
    saveCache()
  } else {
    msg.value = res.message || 'Indice indisponible pour le moment.'
  }
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold">Centre d’indices</h2>

    <div class="form-control w-full">
      <label class="label">
        <span class="label-text mt-8 mb-4">Sélectionne ta salle</span>
      </label>

      <Listbox v-model="selectedRoomId">
        <ListboxButton class="select select-bordered w-full">
          {{ currentRoom?.name || '— Choisir une salle —' }}
        </ListboxButton>

        <ListboxOptions class="menu bg-base-200 rounded-box mt-1 w-full shadow">
          <ListboxOption
            v-for="r in rooms"
            :key="r.id"
            :value="r.id"
            class="menu-item px-3 py-2 hover:bg-base-300 cursor-pointer"
          >
            {{ r.name }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>

      <small class="text-xs opacity-70 mt-1">
        Obligatoire pour recevoir un indice adapté.
      </small>
    </div>

    <div>
      <label class="label">
        <span class="label-text mt-8 mb-4">Question au maître du jeu</span>
      </label>
      <textarea
        v-model="question"
        rows="4"
        class="textarea textarea-bordered w-full"
        placeholder="Décris précisément ce qui te bloque dans la salle."
      />
    </div>

    <div class="flex items-center gap-3">
      <button
        class="btn btn-primary mt-4"
        :disabled="loading || remaining > 0 || !selectedRoomId || !question.trim()"
        @click="demanderIndice"
      >
        Demander un indice
      </button>

      <span v-if="remaining > 0" class="text-xs opacity-70">
        Prochain indice dans ~ {{ remainingLabel }}
      </span>
    </div>

    <p v-if="hint" class="alert alert-success text-sm whitespace-pre-wrap">
      <strong>Indice :</strong> {{ hint }}
    </p>

    <p v-if="msg" class="alert alert-warning text-sm">
      {{ msg }}
    </p>
  </div>
</template>
