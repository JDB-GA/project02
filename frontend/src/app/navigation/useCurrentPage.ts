import { matchPath, useLocation } from 'react-router'
import { APP_PAGES } from './app-pages'

export function useCurrentPage() {
  const { pathname } = useLocation()
  return APP_PAGES.find((page) => matchPath(page.path, pathname))
}
