import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${String(MOBILE_BREAKPOINT - 1)}px)`

const subscribe = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(MOBILE_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => {
    mediaQuery.removeEventListener('change', onChange)
  }
}

const getSnapshot = (): boolean => window.matchMedia(MOBILE_QUERY).matches

const getServerSnapshot = (): boolean => false

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
