import { useRef, type ChangeEvent } from 'react'
import { UploadIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { formatFileSize } from '@/lib/files/format-file-size'
import type { FileInputProps } from './file-input.types'

export function FileInput({ id, name, value, accept, disabled, ref, onChange, onBlur, ...aria }: FileInputProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null)
    onBlur()
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        onChange={handleChange}
      />
      <Button
        ref={ref}
        id={id}
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        {...aria}
      >
        <UploadIcon data-icon="inline-start" aria-hidden="true" />
        {value ? t('fileInput.replace') : t('fileInput.choose')}
      </Button>
      <span className="min-w-0 truncate text-sm text-muted-foreground" dir="auto">
        {value ? `${value.name} · ${formatFileSize(value.size, language)}` : t('fileInput.empty')}
      </span>
    </div>
  )
}
