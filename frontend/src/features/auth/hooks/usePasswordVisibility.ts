import { useState } from 'react'

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((visible) => !visible)
  }

  return { isVisible, toggleVisibility }
}
