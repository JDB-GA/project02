import { useEffect, useMemo } from 'react'

const pendingRevocations = new Map<string, ReturnType<typeof setTimeout>>()

const cancelRevocation = (url: string): void => {
  clearTimeout(pendingRevocations.get(url))
  pendingRevocations.delete(url)
}

const scheduleRevocation = (url: string): void => {
  pendingRevocations.set(
    url,
    setTimeout(() => {
      pendingRevocations.delete(url)
      URL.revokeObjectURL(url)
    }),
  )
}

export function useObjectUrl(blob: Blob | undefined): string | undefined {
  const url = useMemo(() => (blob ? URL.createObjectURL(blob) : undefined), [blob])

  useEffect(() => {
    if (!url) {
      return
    }
    cancelRevocation(url)
    return () => {
      scheduleRevocation(url)
    }
  }, [url])

  return url
}
