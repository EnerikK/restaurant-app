import type { HeroViewModel } from '../types/view-models'

type HeroSectionProps = {
  hero: HeroViewModel
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <header
      className="hero"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(6, 40, 67, 0.94), rgba(10, 87, 135, 0.82)), url('${hero.heroImage}')`,
      }}
    >
      <nav className="topbar">
        <div>
          <p className="eyebrow">Antissa, Lesvos</p>
          <a className="brand" href="#top">
            {hero.name}
          </a>
        </div>
        <div className="topbar-links">
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#visit">Visit</a>
        </div>
      </nav>

      <div className="hero-content" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-text">{hero.description}</p>

          <div className="hero-actions">
            <a className="button button-primary" href={`tel:${hero.phone.replace(/\s+/g, '')}`}>
              Call to book
            </a>
            <a
              className="button button-secondary"
              href={`https://maps.google.com/?q=${encodeURIComponent(hero.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open map
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
            <p className="hero-card-title">House profile</p>
            <p>Greek and Mediterranean food with village-square pacing and a western Lesvos setting.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
