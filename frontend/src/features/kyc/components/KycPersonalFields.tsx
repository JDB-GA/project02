import { useTranslation } from 'react-i18next'
import { FormField } from '@/components/form/FormField'
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { CPR_LENGTH, FULL_NAME_MAX_LENGTH } from '../constants/kyc.constants'
import type { KycFormControl } from '../types/kyc.types'
import { todayIsoDate } from '../utils/kyc-dates'
import { NationalitySelect } from './NationalitySelect'

interface KycPersonalFieldsProps {
  control: KycFormControl
}

export function KycPersonalFields({ control }: KycPersonalFieldsProps) {
  const { t } = useTranslation('kyc')

  return (
    <FieldSet>
      <FieldLegend>{t('form.personalTitle')}</FieldLegend>
      <FieldDescription>{t('form.personalDescription')}</FieldDescription>
      <FieldGroup className="grid gap-4 md:grid-cols-2">
        <FormField control={control} name="fullName" label={t('fields.fullName')}>
          {(props) => (
            <Input {...props} autoComplete="name" maxLength={FULL_NAME_MAX_LENGTH} placeholder={t('fields.fullNamePlaceholder')} />
          )}
        </FormField>
        <FormField control={control} name="cprNumber" label={t('fields.cprNumber')}>
          {(props) => (
            <Input {...props} dir="ltr" inputMode="numeric" maxLength={CPR_LENGTH} placeholder={t('fields.cprPlaceholder')} />
          )}
        </FormField>
        <FormField control={control} name="dateOfBirth" label={t('fields.dateOfBirth')}>
          {(props) => <Input {...props} type="date" dir="ltr" autoComplete="bday" max={todayIsoDate()} />}
        </FormField>
        <FormField control={control} name="nationality" label={t('fields.nationality')}>
          {(props) => <NationalitySelect {...props} />}
        </FormField>
      </FieldGroup>
    </FieldSet>
  )
}
