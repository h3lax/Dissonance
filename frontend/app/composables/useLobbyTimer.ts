import { ref, onUnmounted } from 'vue'

const remaining = ref<number>(0)
let interval: any = null

export function useLobbyTimer() {
  function startCountdown(startTime: number, duration: number, serverNow: number) {
    const offset = Date.now() - serverNow
    const end = startTime + duration

    clearInterval(interval)
    interval = setInterval(() => {
      const now = Date.now() - offset
      remaining.value = Math.max(0, Math.floor((end - now) / 1000))
      if (remaining.value <= 0) clearInterval(interval)
    }, 1000)
  }

  onUnmounted(() => clearInterval(interval))

  return { remaining, startCountdown }
}
