import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas/login.schema'
import type { LoginFormValues } from '../types/auth-form.types'
import { getErrorKey } from '../utils/get-error-key'
import { useLogin } from './useLogin'

const DEFAULT_VALUES: LoginFormValues = { identifier: '', password: '' }

export function useLoginForm() {
  const login = useLogin()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const onSubmit = form.handleSubmit((values) => login.mutate(values))

  return {
    form,
    onSubmit,
    isPending: login.isPending,
    errorKey: login.isError ? getErrorKey(login.error) : null,
  }
}
