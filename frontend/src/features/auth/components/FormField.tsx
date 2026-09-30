import { useId } from 'react'
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import { Field, FieldLabel } from '@/components/ui/field'
import type { FormFieldProps } from './form-field.types'
import { FormFieldError } from './FormFieldError'

export function FormField<TValues extends FieldValues, TName extends FieldPath<TValues>>({
  control,
  name,
  label,
  children,
}: FormFieldProps<TValues, TName>) {
  const id = useId()
  const errorId = `${id}-error`

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
            'aria-describedby': fieldState.invalid ? errorId : undefined,
          })}
          <FormFieldError id={errorId} message={fieldState.error?.message} />
        </Field>
      )}
    />
  )
}
