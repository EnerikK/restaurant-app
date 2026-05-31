import { SectionHeading } from '../components/SectionHeading'

type StorySectionProps = {
  title: string
  paragraphs: string[]
  bullets: string[]
}

export function StorySection({ title, paragraphs, bullets }: StorySectionProps) {
  return (
    <section className="section story-section">
      <div className="story-copy">
        <SectionHeading eyebrow="The setting" title={title} />
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <aside className="info-panel">
        <h3>Good to know</h3>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
