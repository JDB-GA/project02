import { useState } from 'react'
import { SendIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useTransferOptions } from '../hooks/useTransferOptions'
import { SendMoneyForm } from './SendMoneyForm'

export function SendMoneyDialog() {
  const { t } = useTranslation('wallet')
  const [open, setOpen] = useState(false)
  const { data: options, isPending, isError, refetch } = useTransferOptions(open)

  const renderBody = () => {
    if (isPending) {
      return <Skeleton className="h-56 w-full rounded-xl" />
    }
    if (isError) {
      return (
        <LoadErrorAlert
          message={t('transfer.loadError')}
          onRetry={() => {
            void refetch()
          }}
        />
      )
    }
    return (
      <SendMoneyForm
        options={options}
        onSuccess={() => {
          setOpen(false)
        }}
      />
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SendIcon data-icon="inline-start" aria-hidden="true" />
          {t('transfer.open')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('transfer.title')}</DialogTitle>
          <DialogDescription>{t('transfer.description')}</DialogDescription>
        </DialogHeader>
        {renderBody()}
      </DialogContent>
    </Dialog>
  )
}
