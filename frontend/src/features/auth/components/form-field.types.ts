import type { ReactNode } from 'react'
import type { Control, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

export type FieldControlProps<TValues extends FieldValues, TName extends FieldPath<TValues>> =
  ControllerRenderProps<TValues, TName> & {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
  }

export interface FormFieldProps<TValues extends FieldValues, TName extends FieldPath<TValues>> {
  control: Control<TValues>
  name: TName
  label: string
  children: (props: FieldControlProps<TValues, TName>) => ReactNode
}
