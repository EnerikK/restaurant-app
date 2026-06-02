import { useI18n } from '../i18n/useI18n'

type StatusBannerProps = {
  usingFallbackContent: boolean
  unavailableSections: string[]
}

export function StatusBanner({ usingFallbackContent, unavailableSections }: StatusBannerProps) {
  const { messages } = useI18n()

  if (!usingFallbackContent) {
    return null
  }

  const localizedSections = unavailableSections
    .map((section) => messages.status.sections[section as keyof typeof messages.status.sections] ?? section)
    .join(', ')

  return (
    <div className="status-banner" role="status">
      <strong>{messages.status.usingFallbackContent}</strong>{' '}
      {unavailableSections.length > 0
        ? `${messages.status.apiSectionsUnavailable}: ${localizedSections}.`
        : messages.status.backendDataNotConfigured}
    </div>
  )
}
