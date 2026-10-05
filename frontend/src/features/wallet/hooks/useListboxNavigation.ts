import { type KeyboardEvent, useState } from 'react'

export function useListboxNavigation<T>(items: readonly T[], onSelect: (item: T) => void) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const isOpen = open && items.length > 0

  const select = (item: T) => {
    onSelect(item)
    setOpen(false)
    setActiveIndex(-1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (event.key === 'ArrowDown') {
        setOpen(true)
      }
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index) => (index + step + items.length) % items.length)
    } else if (event.key === 'Enter' && items[activeIndex]) {
      event.preventDefault()
      select(items[activeIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  }

  return { isOpen, activeIndex, setOpen, setActiveIndex, select, onKeyDown }
}
