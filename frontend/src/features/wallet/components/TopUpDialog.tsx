import { useState } from 'react'
import { ArrowDownToLineIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LoadErrorAlert } from '@/components/LoadErrorAlert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useTopUpOptions } from '../hooks/useTopUpOptions'
import { TopUpForm } from './TopUpForm'

export function TopUpDialog() {
  const { t } = useTranslation('wallet')
  const [open, setOpen] = useState(false)
  const { data: options, isPending, isError, refetch } = useTopUpOptions(open)

  const renderBody = () => {
    if (isPending) {
      return <Skeleton className="h-40 w-full rounded-xl" />
    }
    if (isError) {
      return (
        <LoadErrorAlert
          message={t('topUp.loadError')}
          onRetry={() => {
            void refetch()
          }}
        />
      )
    }
    return (
      <TopUpForm
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
        <Button type="button" variant="outline">
          <ArrowDownToLineIcon data-icon="inline-start" aria-hidden="true" />
          {t('topUp.open')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('topUp.title')}</DialogTitle>
          <DialogDescription>{t('topUp.description')}</DialogDescription>
        </DialogHeader>
        {renderBody()}
      </DialogContent>
    </Dialog>
  )
}
