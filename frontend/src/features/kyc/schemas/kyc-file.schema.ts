import { z } from 'zod'
import type { ValidationKey } from '@/i18n/i18n.types'
import { validationKey } from '@/i18n/keys'
import { MAX_FILE_BYTES } from '../constants/kyc.constants'

const isFile = (value: unknown): value is File => value instanceof File

export const kycFileSchema = (allowedTypes: readonly string[], typeError: ValidationKey) =>
  z
    .custom<File | null>((value) => value === null || isFile(value))
    .refine((file): file is File => file !== null, { message: validationKey('fileRequired'), abort: true })
    .refine((file) => allowedTypes.includes(file.type), validationKey(typeError))
    .refine((file) => file.size <= MAX_FILE_BYTES, validationKey('fileTooLarge'))
