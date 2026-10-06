import { useState } from 'react'
import { KeyRoundIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { ApiKeyCreated } from '../types/merchant.types'
import { CopyableValue } from './CopyableValue'
import { CreateApiKeyForm } from './CreateApiKeyForm'

export function CreateApiKeyDialog() {
  const { t } = useTranslation('merchant')
  const [open, setOpen] = useState(false)
  const [created, setCreated] = useState<ApiKeyCreated | null>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          setCreated(null)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <KeyRoundIcon data-icon="inline-start" aria-hidden="true" />
          {t('keys.create')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{created ? t('keys.createdTitle') : t('keys.createTitle')}</DialogTitle>
          <DialogDescription>{created ? t('keys.createdDescription') : t('keys.createDescription')}</DialogDescription>
        </DialogHeader>
        {created ? <CopyableValue value={created.secret} /> : <CreateApiKeyForm onCreated={setCreated} />}
      </DialogContent>
    </Dialog>
  )
}
