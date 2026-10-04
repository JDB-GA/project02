import { useId } from 'react'
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import type { FormFieldProps } from './form-field.types'
import { FormFieldError } from './FormFieldError'

export function FormField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
  TTransformedValues = TValues,
>({ control, name, label, description, children }: FormFieldProps<TValues, TName, TTransformedValues>) {
  const id = useId()
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {children({
            ...field,
            id,
            'aria-invalid': fieldState.invalid,
            'aria-describedby': fieldState.invalid ? errorId : description ? descriptionId : undefined,
          })}
          {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
          <FormFieldError id={errorId} message={fieldState.error?.message} />
        </Field>
      )}
    />
  )
}
