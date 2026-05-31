type StatusBannerProps = {
  usingFallbackContent: boolean
  unavailableSections: string[]
}

export function StatusBanner({ usingFallbackContent, unavailableSections }: StatusBannerProps) {
  if (!usingFallbackContent) {
    return null
  }

  return (
    <div className="status-banner" role="status">
      <strong>Using fallback content.</strong>{' '}
      {unavailableSections.length > 0
        ? `API sections unavailable: ${unavailableSections.join(', ')}.`
        : 'Backend data is not fully configured yet.'}
    </div>
  )
}
