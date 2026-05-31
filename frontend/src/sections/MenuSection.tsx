import { SectionHeading } from '../components/SectionHeading'
import type { MenuCategory } from '../types/view-models'

type MenuSectionProps = {
  menu: MenuCategory[]
}

export function MenuSection({ menu }: MenuSectionProps) {
  return (
    <section className="section" id="menu">
      <SectionHeading
        eyebrow="Menu"
        title="Structured menu data, rendered as categories instead of hardcoded static cards."
        description="If the backend menu exists, this section uses it. Otherwise the site falls back to curated sample dishes."
      />

      <div className="menu-grid">
        {menu.map((category) => (
          <article className="menu-card" key={category.id}>
            <h3>{category.name}</h3>
            <div className="menu-items">
              {category.items.map((item) => (
                <div className="menu-item" key={item.id}>
                  <div className="menu-item-heading">
                    <h4>{item.name}</h4>
                    <span>{item.priceLabel}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
