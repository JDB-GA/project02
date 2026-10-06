import { useCallback, useRef } from 'react'
import { NOTIFICATION_SOUND_URL } from '../constants/notification.constants'

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    audioRef.current ??= new Audio(NOTIFICATION_SOUND_URL)
    audioRef.current.currentTime = 0
    void audioRef.current.play().catch(() => undefined)
  }, [])

  return { play }
}
