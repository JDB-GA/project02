import type { ReactNode } from 'react'
import type { Control, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

export type FieldControlProps<TValues extends FieldValues, TName extends FieldPath<TValues>> =
  ControllerRenderProps<TValues, TName> & {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
  }

export interface FormFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
  TTransformedValues = TValues,
> {
  control: Control<TValues, unknown, TTransformedValues>
  name: TName
  label: string
  description?: string
  children: (props: FieldControlProps<TValues, TName>) => ReactNode
}
