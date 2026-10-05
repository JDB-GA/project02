export const formatIban = (value: string): string =>
  value.replace(/\s+/g, '').toUpperCase().replace(/(.{4})(?=.)/g, '$1 ')
