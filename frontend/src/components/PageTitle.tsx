import { useTranslation } from 'react-i18next'

interface PageTitleProps {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  const { t } = useTranslation()

  return <title>{`${title} · ${t('appName')}`}</title>
}
