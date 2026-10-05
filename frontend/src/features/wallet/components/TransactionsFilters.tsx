import { useState } from 'react'
import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ALL_FILTER, TRANSACTION_DIRECTIONS, TRANSACTION_TYPES } from '../constants/wallet.constants'
import type { TransactionDirectionFilter, TransactionTypeFilter, TransactionsQuery } from '../types/wallet.types'
import { TransactionsFilterSelect } from './TransactionsFilterSelect'
import { TransactionsSearchInput } from './TransactionsSearchInput'

interface TransactionsFiltersProps {
  query: TransactionsQuery
  hasFilters: boolean
  onChange: (next: Partial<TransactionsQuery>) => void
  onReset: () => void
}

const TYPE_FILTERS: readonly TransactionTypeFilter[] = [ALL_FILTER, ...TRANSACTION_TYPES]
const DIRECTION_FILTERS: readonly TransactionDirectionFilter[] = [ALL_FILTER, ...TRANSACTION_DIRECTIONS]

export function TransactionsFilters({ query, hasFilters, onChange, onReset }: TransactionsFiltersProps) {
  const { t } = useTranslation('wallet')
  const [searchKey, setSearchKey] = useState(0)

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <TransactionsSearchInput
        key={searchKey}
        value={query.search}
        onSearch={(search) => {
          onChange({ search })
        }}
      />
      <TransactionsFilterSelect
        label={t('filters.type')}
        value={query.type}
        options={TYPE_FILTERS}
        getOptionLabel={(type) => (type === ALL_FILTER ? t('filters.allTypes') : t(`types.${type}`))}
        onChange={(type) => {
          onChange({ type })
        }}
      />
      <TransactionsFilterSelect
        label={t('filters.direction')}
        value={query.direction}
        options={DIRECTION_FILTERS}
        getOptionLabel={(direction) => t(`filters.directions.${direction}`)}
        onChange={(direction) => {
          onChange({ direction })
        }}
      />
      <div className="flex items-center gap-2">
        <Input
          type="date"
          aria-label={t('filters.from')}
          className="w-full sm:w-40"
          value={query.from}
          max={query.to || undefined}
          onChange={(event) => {
            onChange({ from: event.target.value })
          }}
        />
        <span className="text-muted-foreground" aria-hidden="true">
          –
        </span>
        <Input
          type="date"
          aria-label={t('filters.to')}
          className="w-full sm:w-40"
          value={query.to}
          min={query.from || undefined}
          onChange={(event) => {
            onChange({ to: event.target.value })
          }}
        />
      </div>
      {hasFilters && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setSearchKey((key) => key + 1)
            onReset()
          }}
        >
          <XIcon data-icon="inline-start" aria-hidden="true" />
          {t('filters.clear')}
        </Button>
      )}
    </div>
  )
}
