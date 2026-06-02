import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'
import type { MenuCategory } from '../types/view-models'

type MenuSectionProps = {
  menu: MenuCategory[]
}

export function MenuSection({ menu }: MenuSectionProps) {
  const { messages } = useI18n()

  return (
    <section className="section" id="menu">
      <SectionHeading
        eyebrow={messages.menu.eyebrow}
        title={messages.menu.title}
        description={messages.menu.description}
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
