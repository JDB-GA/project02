import { requestBlob, requestJson, requestVoid } from '@/lib/api/http-client'
import { PICTURE_FIELD, PROFILE_ENDPOINTS } from '../constants/profile.constants'
import { profileSchema } from '../schemas/profile.schema'
import type { BusinessNameValues, Profile } from '../types/profile.types'

export const profileApi = {
  get: (signal?: AbortSignal): Promise<Profile> => requestJson(PROFILE_ENDPOINTS.profile, profileSchema, { signal }),

  updateName: (payload: BusinessNameValues): Promise<Profile> =>
    requestJson(PROFILE_ENDPOINTS.profile, profileSchema, { method: 'PATCH', body: payload }),

  picture: (signal?: AbortSignal): Promise<Blob> => requestBlob(PROFILE_ENDPOINTS.picture, { signal }),

  uploadPicture: (file: File): Promise<Profile> => {
    const body = new FormData()
    body.append(PICTURE_FIELD, file)
    return requestJson(PROFILE_ENDPOINTS.picture, profileSchema, { method: 'PUT', body })
  },

  removePicture: (): Promise<void> => requestVoid(PROFILE_ENDPOINTS.picture, { method: 'DELETE' }),
}
