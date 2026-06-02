import type { Highlight } from '../types/view-models'
import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'

type HighlightsSectionProps = {
  highlights: Highlight[]
}

export function HighlightsSection({ highlights }: HighlightsSectionProps) {
  const { messages } = useI18n()

  return (
    <section className="section">
      <SectionHeading
        eyebrow={messages.highlights.eyebrow}
        title={messages.highlights.title}
      />

      <div className="highlights-grid">
        {highlights.map((item) => (
          <article className="highlight-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
