import { useRef, type ChangeEvent } from 'react'
import { Trash2Icon, UploadIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { PICTURE_ACCEPT } from '../constants/profile.constants'
import { useProfilePictureActions } from '../hooks/useProfilePictureActions'

interface ProfilePictureActionsProps {
  hasPicture: boolean
}

export function ProfilePictureActions({ hasPicture }: ProfilePictureActionsProps) {
  const { t } = useTranslation('profile')
  const inputRef = useRef<HTMLInputElement>(null)
  const { upload, remove, isPending } = useProfilePictureActions()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) {
      upload.mutate(file)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <input ref={inputRef} type="file" accept={PICTURE_ACCEPT} tabIndex={-1} aria-hidden="true" className="hidden" onChange={handleChange} />
      <Button type="button" variant="outline" size="sm" disabled={isPending} onClick={() => inputRef.current?.click()}>
        <UploadIcon data-icon="inline-start" aria-hidden="true" />
        {hasPicture ? t('picture.replace') : t('picture.upload')}
      </Button>
      {hasPicture && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={() => {
            remove.mutate()
          }}
        >
          <Trash2Icon data-icon="inline-start" aria-hidden="true" />
          {t('picture.remove')}
        </Button>
      )}
    </div>
  )
}
