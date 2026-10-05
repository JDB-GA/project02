import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UsersFilterSelectProps<T extends string> {
  label: string
  value: T
  options: readonly T[]
  getOptionLabel: (option: T) => string
  onChange: (value: T) => void
}

export function UsersFilterSelect<T extends string>({ label, value, options, getOptionLabel, onChange }: UsersFilterSelectProps<T>) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const option = options.find((candidate) => candidate === next)
        if (option) {
          onChange(option)
        }
      }}
    >
      <SelectTrigger aria-label={label} className="w-full sm:w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {getOptionLabel(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
