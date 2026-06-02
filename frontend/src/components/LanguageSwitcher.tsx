import { useI18n } from '../i18n/useI18n'

export function LanguageSwitcher() {
  const { locale, messages, setLocale } = useI18n()

  return (
    <div className="language-switcher" aria-label={messages.language.label}>
      <button
        className={`language-switcher-button${locale === 'en' ? ' is-active' : ''}`}
        type="button"
        onClick={() => setLocale('en')}
      >
        {messages.language.en}
      </button>
      <button
        className={`language-switcher-button${locale === 'el' ? ' is-active' : ''}`}
        type="button"
        onClick={() => setLocale('el')}
      >
        {messages.language.el}
      </button>
    </div>
  )
}
