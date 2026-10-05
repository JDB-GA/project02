import type { UseMutationResult } from '@tanstack/react-query'
import { CheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getErrorKey } from '@/lib/api/get-error-key'
import type { KycReview } from '../types/kyc-review.types'

interface ApproveKycDialogProps {
  applicantName: string
  approve: UseMutationResult<KycReview, Error, void>
}

export function ApproveKycDialog({ applicantName, approve }: ApproveKycDialogProps) {
  const { t } = useTranslation(['kycReview', 'errors'])

  const handleApprove = () => {
    approve.mutate(undefined, {
      onSuccess: () => toast.success(t('kycReview:actions.approved')),
      onError: (error) => toast.error(t(`errors:${getErrorKey(error)}`)),
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={approve.isPending}>
          <CheckIcon data-icon="inline-start" aria-hidden="true" />
          {t('kycReview:actions.approve')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('kycReview:actions.approveTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('kycReview:actions.approveDescription', { name: applicantName })}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('kycReview:actions.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleApprove}>{t('kycReview:actions.approve')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
