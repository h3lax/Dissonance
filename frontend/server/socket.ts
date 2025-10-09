import { Server } from 'socket.io'

interface Message {
  sender: string
  message: string
}

interface Lobby {
  id: string
  messages: Message[]
  startTime: number
  duration: number // ms
  timeout?: NodeJS.Timeout
}

const LOBBY_DURATION = 62 * 60 * 1000

const lobbies = new Map<string, Lobby>()

const io = new Server({
  cors: { origin: '*' },
})

const getOrCreateLobby = (id: string): Lobby => {
  if (!lobbies.has(id)) {
    const lobby: Lobby = {
      id,
      messages: [],
      startTime: Date.now(),
      duration: LOBBY_DURATION,
    }

    lobby.timeout = setTimeout(() => {
      console.log(`⌛ Lobby ${id} expired`)
      lobbies.delete(id)
    }, LOBBY_DURATION)

    lobbies.set(id, lobby)
    console.log(`🆕 Created lobby ${id}`)
  }
  return lobbies.get(id)!
}

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id)

  socket.on('join-lobby', (lobbyId: string) => {
    console.log({'lobby creation ordered with id :': lobbyId})
    const lobby = getOrCreateLobby(lobbyId)

    socket.join(lobbyId)

    socket.emit('chat-history', lobby.messages)
    socket.emit('lobby-timer', {
      startTime: lobby.startTime,
      duration: lobby.duration,
      now: Date.now(),
    })
  })

  socket.on('send-message', ({ player, message }) => {
    const [ , lobbyId ] = Array.from(socket.rooms)

    if (!lobbyId) {
      console.warn(`⚠️ Socket ${socket.id} not in a lobby`)
      return
    }

    const lobby = getOrCreateLobby(lobbyId)
    const msg = { sender: player, message }

    lobby.messages.push(msg)
    io.to(lobbyId).emit('receive-message', msg)
  })

  socket.on('disconnect', () => {
    console.log(`❌ ${socket.id} disconnected`)
  })
})

io.listen(3001)
console.log('🚀 Socket.IO server running on port 3001')
