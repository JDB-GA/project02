import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { userManagementApi } from '../api/user-management.api'
import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/user-management.constants'
import { createUserSchema } from '../schemas/create-user.schema'
import type { AdminUser, CreateUserFormInput, CreateUserFormValues } from '../types/user-management.types'
import { getContactFieldErrors } from '../utils/get-contact-field-errors'
import { getUserPath } from '../utils/get-user-path'

const DEFAULT_VALUES: CreateUserFormInput = { email: '', mobileNumber: '', role: '', permissions: [] }

export function useCreateUserForm() {
  const { t } = useTranslation('users')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const create = useMutation({ mutationFn: userManagementApi.create })
  const form = useForm<CreateUserFormInput, unknown, CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const handleCreated = async (user: AdminUser) => {
    toast.success(t('create.success'))
    queryClient.setQueryData(USER_MANAGEMENT_QUERY_KEYS.detail(user.id), user)
    await queryClient.invalidateQueries({ queryKey: USER_MANAGEMENT_QUERY_KEYS.lists })
    await navigate(getUserPath(user.id), { replace: true })
  }

  const submit = form.handleSubmit((values) => {
    const permissions = values.role === 'ADMIN' ? values.permissions : []
    create.mutate(
      { ...values, permissions },
      {
        onSuccess: (user) => {
          void handleCreated(user)
        },
        onError: (error) => {
          getContactFieldErrors(error).forEach(({ field, key }) => {
            form.setError(field, { message: key }, { shouldFocus: true })
          })
        },
      },
    )
  })

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void submit(event)
  }

  const hasFieldErrors = create.isError && getContactFieldErrors(create.error).length > 0

  return {
    form,
    onSubmit,
    isPending: create.isPending,
    errorKey: create.isError && !hasFieldErrors ? getErrorKey(create.error) : null,
  }
}
