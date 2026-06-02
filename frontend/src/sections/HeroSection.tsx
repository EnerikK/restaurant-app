import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useI18n } from '../i18n/useI18n'
import type { HeroViewModel } from '../types/view-models'

type HeroSectionProps = {
  hero: HeroViewModel
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { messages } = useI18n()

  return (
    <header
      className="hero"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(6, 40, 67, 0.94), rgba(10, 87, 135, 0.82)), url('${hero.heroImage}')`,
      }}
    >
      <nav className="topbar">
        <div>
          <p className="eyebrow">{messages.hero.location}</p>
          <a className="brand" href="#top">
            {hero.name}
          </a>
        </div>
        <div className="topbar-links">
          <a href="#menu">{messages.nav.menu}</a>
          <a href="#gallery">{messages.nav.gallery}</a>
          <a href="#visit">{messages.nav.visit}</a>
          <a href="#contact">{messages.nav.contact}</a>
        </div>
        <LanguageSwitcher />
      </nav>

      <div className="hero-content" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-text">{hero.description}</p>

          <div className="hero-actions">
            <a className="button button-primary" href={`tel:${hero.phone.replace(/\s+/g, '')}`}>
              {messages.hero.callToBook}
            </a>
            <a
              className="button button-secondary"
              href={`https://maps.google.com/?q=${encodeURIComponent(hero.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              {messages.hero.openMap}
            </a>
          </div>

          <ul className="hero-meta">
            <li>{hero.address}</li>
            <li>{hero.phone}</li>
            {hero.email ? <li>{hero.email}</li> : null}
          </ul>
        </div>

        <div className="hero-card">
          <img src={hero.heroImage} alt={hero.name} />
          <div className="hero-card-body">
            <p className="hero-card-title">{messages.hero.cardTitle}</p>
            <p>{messages.hero.cardDescription}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
