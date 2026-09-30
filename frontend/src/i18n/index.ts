import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_DIRECTIONS,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  isLanguage,
} from './languages'
import { DEFAULT_NAMESPACE, NAMESPACES, resources } from './resources'

const applyDocumentLanguage = (languageCode: string): void => {
  const language = isLanguage(languageCode) ? languageCode : DEFAULT_LANGUAGE
  document.documentElement.lang = language
  document.documentElement.dir = LANGUAGE_DIRECTIONS[language]
}

i18n.on('languageChanged', applyDocumentLanguage)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: [...NAMESPACES],
    defaultNS: DEFAULT_NAMESPACE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n
