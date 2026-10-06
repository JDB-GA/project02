import type { SubmitEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { getErrorKey } from '@/lib/api/get-error-key'
import { apiKeyApi } from '../api/api-key.api'
import { MERCHANT_QUERY_KEYS } from '../constants/merchant.constants'
import { createApiKeySchema } from '../schemas/create-api-key.schema'
import type { ApiKeyCreated, CreateApiKeyValues } from '../types/merchant.types'

export function useCreateApiKeyForm(onCreated: (created: ApiKeyCreated) => void) {
  const queryClient = useQueryClient()
  const create = useMutation({ mutationFn: apiKeyApi.create })
  const form = useForm<CreateApiKeyValues>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: { name: '' },
    mode: 'onTouched',
  })

  const submit = form.handleSubmit((values) => {
    create.mutate(values, {
      onSuccess: (created) => {
        form.reset()
        void queryClient.invalidateQueries({ queryKey: MERCHANT_QUERY_KEYS.apiKeys })
        onCreated(created)
      },
    })
  })

  return {
    form,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => {
      void submit(event)
    },
    isPending: create.isPending,
    errorKey: create.isError ? getErrorKey(create.error) : null,
  }
}
