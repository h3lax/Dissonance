import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'

const socket = ref<Socket | null>(null)

export function useSocket() {
  const connect = () => {
    if (socket.value && socket.value.connected) return // Avoid reconnects

    socket.value = io('http://localhost:3001', { transports: ['websocket'] })

    socket.value.on('connect', () => {
      console.log('✅ Connected to Socket.IO as', socket.value?.id)
    })

    socket.value.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message)
    })
  }

  const joinLobby = (lobbyId: string) => {
    socket.value?.emit('join-lobby', lobbyId)
    console.log('📡 Joined lobby:', lobbyId)
  }

  const sendMessage = (player: string, message: string) => {
    socket.value?.emit('send-message', { player, message })
  }

  const onMessage = (callback: (data: { sender: string; message: string }) => void) => {
    socket.value?.off('receive-message') // prevent duplicates
    socket.value?.on('receive-message', callback)
  }

  const onHistory = (callback: (history: { sender: string; message: string }[]) => void) => {
    socket.value?.off('chat-history')
    socket.value?.on('chat-history', callback)
  }

  const onLobbyTimer = (callback: (data: any) => void) => {
    socket.value?.off('lobby-timer')
    socket.value?.on('lobby-timer', callback)
  }

  return { connect, joinLobby, sendMessage, onMessage, onHistory, onLobbyTimer }
}
