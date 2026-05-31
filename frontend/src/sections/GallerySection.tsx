import { SectionHeading } from '../components/SectionHeading'
import type { GalleryImage } from '../types/view-models'

type GallerySectionProps = {
  gallery: GalleryImage[]
}

export function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section className="section" id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title="Visuals are handled as data too, with backend images preferred when present."
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
