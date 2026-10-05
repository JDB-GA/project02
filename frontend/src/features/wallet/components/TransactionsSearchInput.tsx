import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { TRANSACTION_SEARCH_DEBOUNCE_MS, TRANSACTION_SEARCH_MAX_LENGTH } from '../constants/wallet.constants'

interface TransactionsSearchInputProps {
  value: string
  onSearch: (search: string) => void
}

export function TransactionsSearchInput({ value, onSearch }: TransactionsSearchInputProps) {
  const { t } = useTranslation('wallet')
  const [draft, setDraft] = useState(value)
  const debounced = useDebouncedValue(draft, TRANSACTION_SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    if (debounced.trim() !== value.trim()) {
      onSearch(debounced)
    }
  }, [debounced, value, onSearch])

  return (
    <InputGroup className="sm:max-w-xs">
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        aria-label={t('filters.search')}
        placeholder={t('filters.searchPlaceholder')}
        maxLength={TRANSACTION_SEARCH_MAX_LENGTH}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value)
        }}
      />
    </InputGroup>
  )
}
