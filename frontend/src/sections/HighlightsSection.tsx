import type { Highlight } from '../types/view-models'
import { SectionHeading } from '../components/SectionHeading'

type HighlightsSectionProps = {
  highlights: Highlight[]
}

export function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="Why come here"
        title="A real restaurant front, not a starter template with restaurant copy pasted on top."
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
