import type { TFunction } from 'i18next'
import { DOCUMENT_FILE_EXTENSIONS } from '../constants/kyc.constants'
import type { KycDocument } from '../types/kyc.types'

export const getKycDocumentFileName = (t: TFunction<'kyc'>, document: KycDocument): string =>
  `${t(`documents.${document.type}`)}${DOCUMENT_FILE_EXTENSIONS[document.contentType] ?? ''}`
