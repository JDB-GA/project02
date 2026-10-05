import { useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { FormField } from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { REJECTION_REASON_MAX_LENGTH } from '../constants/kyc-review.constants'
import { useRejectKycForm } from '../hooks/useRejectKycForm'
import type { KycReview, RejectKycFormValues } from '../types/kyc-review.types'

interface RejectKycDialogProps {
  reject: UseMutationResult<KycReview, Error, RejectKycFormValues>
}

export function RejectKycDialog({ reject }: RejectKycDialogProps) {
  const { t } = useTranslation('kycReview')
  const [open, setOpen] = useState(false)
  const { form, onSubmit, errorKey } = useRejectKycForm(reject, () => {
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <XIcon data-icon="inline-start" aria-hidden="true" />
          {t('actions.reject')}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('actions.rejectTitle')}</DialogTitle>
          <DialogDescription>{t('actions.rejectDescription')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <FieldGroup>
            <FormField control={form.control} name="reason" label={t('actions.reason')}>
              {(props) => (
                <Textarea {...props} rows={4} maxLength={REJECTION_REASON_MAX_LENGTH} placeholder={t('actions.reasonPlaceholder')} />
              )}
            </FormField>
            <FormErrorMessage errorKey={errorKey} />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t('actions.cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={reject.isPending} aria-busy={reject.isPending}>
              {reject.isPending && <Spinner data-icon="inline-start" />}
              {t('actions.reject')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
