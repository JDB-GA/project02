import { useTranslation } from 'react-i18next'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { useSendMoneyForm } from '../hooks/useSendMoneyForm'
import type { TransferOptions } from '../types/transfer.types'
import { SendMoneyFields } from './SendMoneyFields'

interface SendMoneyFormProps {
  options: TransferOptions
  onSuccess: () => void
}

export function SendMoneyForm({ options, onSuccess }: SendMoneyFormProps) {
  const { t } = useTranslation('wallet')
  const { form, onSubmit, isPending, errorKey } = useSendMoneyForm(onSuccess)

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FieldGroup>
        <SendMoneyFields control={form.control} options={options} />
        <FormErrorMessage errorKey={errorKey} />
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            {t('topUp.cancel')}
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending && <Spinner data-icon="inline-start" />}
          {t('transfer.submit')}
        </Button>
      </DialogFooter>
    </form>
  )
}
