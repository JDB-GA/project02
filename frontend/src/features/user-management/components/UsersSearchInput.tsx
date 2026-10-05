import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { SEARCH_DEBOUNCE_MS, SEARCH_MAX_LENGTH } from '../constants/user-management.constants'

interface UsersSearchInputProps {
  value: string
  onSearch: (search: string) => void
}

export function UsersSearchInput({ value, onSearch }: UsersSearchInputProps) {
  const { t } = useTranslation('users')
  const [draft, setDraft] = useState(value)
  const debounced = useDebouncedValue(draft, SEARCH_DEBOUNCE_MS)

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
        maxLength={SEARCH_MAX_LENGTH}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value)
        }}
      />
    </InputGroup>
  )
}
