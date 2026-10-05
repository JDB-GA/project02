import type { Language } from '@/i18n/i18n.types'
import { CURRENCY, CURRENCY_DECIMALS } from '../constants/wallet.constants'

export const formatMoney = (amount: number, language: Language): string =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: CURRENCY_DECIMALS,
    maximumFractionDigits: CURRENCY_DECIMALS,
  }).format(amount)
