const isInternalPath = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')

export const getReturnPath = (state: unknown): string | null => {
  if (typeof state !== 'object' || state === null || !('from' in state)) {
    return null
  }
  return isInternalPath(state.from) ? state.from : null
}
