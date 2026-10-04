import type { Ref } from 'react'

export interface FileInputProps {
  id: string
  name: string
  value: File | null
  accept: string
  disabled?: boolean
  ref: Ref<HTMLButtonElement>
  onChange: (file: File | null) => void
  onBlur: () => void
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}
