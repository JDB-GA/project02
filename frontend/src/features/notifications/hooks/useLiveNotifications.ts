import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { env } from '@/config/env'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { WALLET_QUERY_KEYS } from '@/features/wallet/constants/wallet.constants'
import { formatMoney } from '@/features/wallet/utils/format-money'
import { DEFAULT_LANGUAGE, isLanguage } from '@/i18n/languages'
import { NOTIFICATION_ENDPOINTS, NOTIFICATION_EVENTS } from '../constants/notification.constants'
import { parseMoneyReceivedNotification } from '../utils/parse-money-received-notification'
import { useNotificationSound } from './useNotificationSound'

export function useLiveNotifications() {
  const { data: user } = useCurrentUser()
  const queryClient = useQueryClient()
  const { i18n, t } = useTranslation('wallet')
  const { play } = useNotificationSound()

  useEffect(() => {
    if (!user) {
      return
    }

    const stream = new EventSource(`${env.apiUrl}${NOTIFICATION_ENDPOINTS.stream}`, { withCredentials: true })
    const onMoneyReceived = (event: Event) => {
      if (!(event instanceof MessageEvent)) {
        return
      }
      const notification = parseMoneyReceivedNotification(event.data)
      if (!notification) {
        return
      }

      const resolvedLanguage = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE
      const language = isLanguage(resolvedLanguage) ? resolvedLanguage : DEFAULT_LANGUAGE

      play()

      toast.success(t('notifications.moneyReceived.title'), {
        description: t('notifications.moneyReceived.description', {
          amount: formatMoney(notification.amount, language),
          sender: notification.senderName,
        }),
      })

      void queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all })
    }

    stream.addEventListener(NOTIFICATION_EVENTS.moneyReceived, onMoneyReceived)
    return () => {
      stream.removeEventListener(NOTIFICATION_EVENTS.moneyReceived, onMoneyReceived)
      stream.close()
    }
  }, [i18n.resolvedLanguage, queryClient, t, user, play])
}