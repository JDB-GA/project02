const BYTES_PER_KILOBYTE = 1024
const BYTES_PER_MEGABYTE = BYTES_PER_KILOBYTE * 1024

const toUnit = (bytes: number): [number, string] => {
  if (bytes >= BYTES_PER_MEGABYTE) {
    return [bytes / BYTES_PER_MEGABYTE, 'megabyte']
  }
  if (bytes >= BYTES_PER_KILOBYTE) {
    return [bytes / BYTES_PER_KILOBYTE, 'kilobyte']
  }
  return [bytes, 'byte']
}

export function formatFileSize(bytes: number, locale: string): string {
  const [value, unit] = toUnit(bytes)
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'narrow',
    maximumFractionDigits: 1,
  }).format(value)
}
