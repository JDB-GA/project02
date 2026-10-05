import { useEffect, useState } from 'react'

export function useCopyToClipboard(resetAfterMs: number) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return
    }
    const timer = setTimeout(() => {
      setCopied(false)
    }, resetAfterMs)
    return () => {
      clearTimeout(timer)
    }
  }, [copied, resetAfterMs])

  const copy = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      return false
    }
  }

  return { copied, copy }
}
