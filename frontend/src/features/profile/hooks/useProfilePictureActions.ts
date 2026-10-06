import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getErrorKey } from '@/lib/api/get-error-key'
import { profileApi } from '../api/profile.api'
import { PROFILE_QUERY_KEYS } from '../constants/profile.constants'

export function useProfilePictureActions() {
  const { t } = useTranslation(['profile', 'errors'])
  const queryClient = useQueryClient()
  const onError = (error: Error) => toast.error(t(`errors:${getErrorKey(error)}`))

  const upload = useMutation({
    mutationFn: profileApi.uploadPicture,
    onSuccess: async (profile) => {
      toast.success(t('profile:picture.updated'))
      queryClient.setQueryData(PROFILE_QUERY_KEYS.profile, profile)
      await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.picture })
    },
    onError,
  })

  const remove = useMutation({
    mutationFn: profileApi.removePicture,
    onSuccess: async () => {
      toast.success(t('profile:picture.removed'))
      queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEYS.picture })
      await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile, exact: true })
    },
    onError,
  })

  return { upload, remove, isPending: upload.isPending || remove.isPending }
}
