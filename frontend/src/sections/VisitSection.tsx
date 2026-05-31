import type { OpeningHourViewModel } from '../types/view-models'

type VisitSectionProps = {
  address: string
  phone: string
  email: string | null
  hours: OpeningHourViewModel[]
}

export function VisitSection({ address, phone, email, hours }: VisitSectionProps) {
  return (
    <section className="section visit-section" id="visit">
      <div className="visit-card">
        <div>
          <p className="eyebrow">Plan your stop</p>
          <h2>Visit To Kati Allo in the center of Antissa.</h2>
          <p>
            Contact links are real interactive elements, opening hours are structured data,
            and the section is usable on mobile instead of being decorative filler.
          </p>
        </div>

        <div className="visit-grid">
          <div className="contact-card">
            <h3>Contact</h3>
            <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            {email ? <a href={`mailto:${email}`}>{email}</a> : null}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">
              {address}
            </a>
          </div>

          <div className="hours-card">
            <h3>Opening hours</h3>
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
