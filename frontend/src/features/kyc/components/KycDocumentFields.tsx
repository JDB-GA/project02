import { useTranslation } from 'react-i18next'
import { FileInput } from '@/components/form/FileInput'
import { FormField } from '@/components/form/FormField'
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IDENTITY_FILE_TYPES, MAX_FILE_SIZE_MB, PHOTO_FILE_TYPES } from '../constants/kyc.constants'
import type { KycFormControl } from '../types/kyc.types'
import { tomorrowIsoDate } from '../utils/kyc-dates'

interface KycDocumentFieldsProps {
  control: KycFormControl
}

export function KycDocumentFields({ control }: KycDocumentFieldsProps) {
  const { t } = useTranslation('kyc')
  const pdfHint = t('hints.pdf', { maxFileSizeMb: MAX_FILE_SIZE_MB })
  const minExpiry = tomorrowIsoDate()

  return (
    <FieldSet>
      <FieldLegend>{t('form.documentsTitle')}</FieldLegend>
      <FieldDescription>{t('form.documentsDescription')}</FieldDescription>
      <FieldGroup className="grid gap-4 md:grid-cols-2">
        <FormField control={control} name="cprFile" label={t('fields.cprFile')} description={pdfHint}>
          {(props) => <FileInput {...props} accept={IDENTITY_FILE_TYPES.join(',')} />}
        </FormField>
        <FormField control={control} name="cprExpiryDate" label={t('fields.cprExpiryDate')}>
          {(props) => <Input {...props} type="date" dir="ltr" min={minExpiry} />}
        </FormField>
        <FormField control={control} name="passportFile" label={t('fields.passportFile')} description={pdfHint}>
          {(props) => <FileInput {...props} accept={IDENTITY_FILE_TYPES.join(',')} />}
        </FormField>
        <FormField control={control} name="passportExpiryDate" label={t('fields.passportExpiryDate')}>
          {(props) => <Input {...props} type="date" dir="ltr" min={minExpiry} />}
        </FormField>
        <FormField
          control={control}
          name="photo"
          label={t('fields.photo')}
          description={t('hints.image', { maxFileSizeMb: MAX_FILE_SIZE_MB })}
        >
          {(props) => <FileInput {...props} accept={PHOTO_FILE_TYPES.join(',')} />}
        </FormField>
      </FieldGroup>
    </FieldSet>
  )
}
