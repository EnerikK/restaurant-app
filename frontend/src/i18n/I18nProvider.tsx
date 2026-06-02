import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { I18nContext, type I18nContextValue } from './I18nContext'
import type { Locale } from './messages'
import { messagesByLocale } from './messages'

const STORAGE_KEY = 'restaurant-app-locale'

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'el') {
    return stored
  }

  return window.navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en'
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>(detectInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = messagesByLocale[locale].meta.title
  }, [locale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages: messagesByLocale[locale],
      setLocale,
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
