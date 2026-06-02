import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'
import type { GalleryImage } from '../types/view-models'

type GallerySectionProps = {
  gallery: GalleryImage[]
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const { messages } = useI18n()

  return (
    <section className="section" id="gallery">
      <SectionHeading
        eyebrow={messages.gallery.eyebrow}
        title={messages.gallery.title}
      />

      <div className="gallery-grid">
        {gallery.map((image) => (
          <figure className="gallery-card" key={image.id}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
