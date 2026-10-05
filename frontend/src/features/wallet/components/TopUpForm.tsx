import { useTranslation } from 'react-i18next'
import { FormErrorMessage } from '@/components/form/FormErrorMessage'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { useTopUpForm } from '../hooks/useTopUpForm'
import type { TopUpOptions } from '../types/wallet.types'
import { TopUpFormFields } from './TopUpFormFields'

interface TopUpFormProps {
  options: TopUpOptions
  onSuccess: () => void
}

export function TopUpForm({ options, onSuccess }: TopUpFormProps) {
  const { t } = useTranslation('wallet')
  const { form, onSubmit, isPending, errorKey } = useTopUpForm(onSuccess)

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <FieldGroup>
        <TopUpFormFields control={form.control} options={options} />
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
          {t('topUp.submit')}
        </Button>
      </DialogFooter>
    </form>
  )
}
