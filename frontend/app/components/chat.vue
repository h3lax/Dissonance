<template>
  <div class="p-8 overflow-y-auto h-screen">
    <h1 class="text-xl font-bold mb-4">Lobby {{ lobby }}</h1>

    <div class="mb-4">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="msg.sender === player ? 'chat chat-end' : 'chat chat-start'"
      >
        <div class="chat-header">{{ msg.sender }}</div>
        <div class="chat-bubble text-sm" :class="msg.sender === player ? 'chat-bubble-secondary' : 'chat-bubble-warning'">{{ msg.message }}</div>
      </div>
    </div>

    <input
      v-model="input"
      @keyup.enter="send"
      placeholder="Type message..."
      class="input input-bordered w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSocket } from '~/composables/useSocket'
import { useLobbyTimer } from '~/composables/useLobbyTimer'
import { useStorage } from '@vueuse/core'

const { connect, joinLobby, sendMessage, onMessage, onHistory, onLobbyTimer } = useSocket()
const { remaining, startCountdown } = useLobbyTimer()

const lobby = useStorage('lobby', '')
const input = ref('')
const player = useStorage('nickname', '')
const messages = ref<{ sender: string; message: string }[]>([])

onMounted(() => {
  connect()
  joinLobby(lobby.value)

  // Load previous history
  onHistory((history) => {
    messages.value = history
  })

  // Listen for new messages
  onMessage((data) => {
    messages.value.push(data)
  })

  onLobbyTimer(({ startTime, duration, now }) => {
    startCountdown(startTime, duration, now)
  })
})

onBeforeUnmount(() => {
  // Optional cleanup if you want to fully disconnect when leaving the component
  // socket.value?.disconnect()
})

const send = () => {
  if (!input.value.trim()) return
  sendMessage(player.value, input.value)
  input.value = ''
}
</script>
