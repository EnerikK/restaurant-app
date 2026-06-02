import { useI18n } from '../i18n/useI18n'
import type { OpeningHourViewModel } from '../types/view-models'

type VisitSectionProps = {
  address: string
  mapQuery: string
  phone: string
  email: string | null
  hours: OpeningHourViewModel[]
}

export function VisitSection({ address, mapQuery, phone, email, hours }: VisitSectionProps) {
  const { messages } = useI18n()

  return (
    <section className="section visit-section" id="visit">
      <div className="visit-card">
        <div>
          <p className="eyebrow">{messages.visit.eyebrow}</p>
          <h2>{messages.visit.title}</h2>
          <p>{messages.visit.description}</p>
        </div>

        <div className="visit-grid">
          <div className="contact-card">
            <h3>{messages.visit.contactTitle}</h3>
            <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            {email ? <a href={`mailto:${email}`}>{email}</a> : null}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">
              {address}
            </a>
          </div>

          <div className="hours-card">
            <h3>{messages.visit.openingHoursTitle}</h3>
            <ul>
              {hours.map((item) => (
                <li key={item.day}>
                  <span>{item.day}</span>
                  <strong>{item.hours}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
