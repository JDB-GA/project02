import { Trash2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ConfirmActionDialog } from '@/components/ConfirmActionDialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCleanSeedData } from '../hooks/useCleanSeedData'

export function CleanSeedDataCard() {
  const { t } = useTranslation()
  const cleanSeedData = useCleanSeedData()

  return (
    <Card className="w-full max-w-md border-destructive/40">
      <CardHeader>
        <CardTitle>{t('admin.cleanData.title')}</CardTitle>
        <CardDescription>{t('admin.cleanData.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ConfirmActionDialog
          trigger={<><Trash2Icon aria-hidden="true" />{t('admin.cleanData.action')}</>}
          title={t('admin.cleanData.confirmTitle')}
          description={t('admin.cleanData.confirmDescription')}
          confirmLabel={t('admin.cleanData.action')}
          cancelLabel={t('close')}
          destructive
          disabled={cleanSeedData.isPending}
          onConfirm={() => {
            cleanSeedData.mutate(undefined, {
              onSuccess: () => toast.success(t('admin.cleanData.success')),
              onError: () => toast.error(t('admin.cleanData.failure')),
            })
          }}
        />
      </CardContent>
    </Card>
  )
}
