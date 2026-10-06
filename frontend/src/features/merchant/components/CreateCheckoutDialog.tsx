import { useState } from 'react'
import { LinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { CheckoutSession } from '../types/merchant.types'
import { CopyableValue } from './CopyableValue'
import { CreateCheckoutForm } from './CreateCheckoutForm'

export function CreateCheckoutDialog() {
  const { t } = useTranslation('merchant')
  const [open, setOpen] = useState(false)
  const [created, setCreated] = useState<CheckoutSession | null>(null)

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
          <LinkIcon data-icon="inline-start" aria-hidden="true" />
          {t('payments.create')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{created ? t('payments.createdTitle') : t('payments.createTitle')}</DialogTitle>
          <DialogDescription>{created ? t('payments.createdDescription') : t('payments.createDescription')}</DialogDescription>
        </DialogHeader>
        {created ? <CopyableValue value={created.checkoutUrl} /> : <CreateCheckoutForm onCreated={setCreated} />}
      </DialogContent>
    </Dialog>
  )
}
