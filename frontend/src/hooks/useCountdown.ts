import { useEffect, useState } from 'react'

const ONE_SECOND_MS = 1000

export function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    if (remaining <= 0) {
      return
    }
    const timer = setTimeout(() => {
      setRemaining((seconds) => seconds - 1)
    }, ONE_SECOND_MS)
    return () => {
      clearTimeout(timer)
    }
  }, [remaining])

  const restart = () => {
    setRemaining(initialSeconds)
  }

  return { remaining, restart }
}
