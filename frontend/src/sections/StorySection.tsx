import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'

type StorySectionProps = {
  title: string
  paragraphs: string[]
  bullets: string[]
}

export function StorySection({ title, paragraphs, bullets }: StorySectionProps) {
  const { messages } = useI18n()

  return (
    <section className="section story-section">
      <div className="story-copy">
        <SectionHeading eyebrow={messages.story.eyebrow} title={title} />
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <aside className="info-panel">
        <h3>{messages.story.infoTitle}</h3>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
