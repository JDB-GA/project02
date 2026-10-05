import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { RecipientSuggestion } from '../types/transfer.types'

interface RecipientSuggestionOptionProps {
  id: string
  suggestion: RecipientSuggestion
  active: boolean
  onSelect: () => void
  onHover: () => void
}

export function RecipientSuggestionOption({ id, suggestion, active, onSelect, onHover }: RecipientSuggestionOptionProps) {
  const { t } = useTranslation('common')

  return (
    <li
      id={id}
      role="option"
      aria-selected={active}
      className={cn('flex cursor-pointer items-center gap-3 rounded-md px-3 py-2', active && 'bg-accent text-accent-foreground')}
      onMouseDown={(event) => {
        event.preventDefault()
        onSelect()
      }}
      onMouseEnter={onHover}
    >
      <span className="flex min-w-0 flex-col">
        <span className="font-medium">{suggestion.maskedName}</span>
        <bdi dir="ltr" className="truncate text-xs text-muted-foreground">
          {`${suggestion.maskedEmail} · ${suggestion.maskedMobile}`}
        </bdi>
      </span>
      {suggestion.role === 'MERCHANT' && (
        <Badge variant="secondary" className="ms-auto">
          {t('roles.MERCHANT')}
        </Badge>
      )}
    </li>
  )
}
