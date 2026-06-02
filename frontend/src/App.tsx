import './App.css'

import { StatusBanner } from './components/StatusBanner'
import { ContactSection } from './sections/ContactSection'
import { GallerySection } from './sections/GallerySection'
import { HeroSection } from './sections/HeroSection'
import { HighlightsSection } from './sections/HighlightsSection'
import { MenuSection } from './sections/MenuSection'
import { StorySection } from './sections/StorySection'
import { VisitSection } from './sections/VisitSection'
import { useRestaurantPageData } from './hooks/use-restaurant-page-data'
import { useI18n } from './i18n/useI18n'

function App() {
  const { locale, messages } = useI18n()
  const { data, isLoading, isFetching } = useRestaurantPageData(locale, messages)

  return (
    <div className="page-shell">
      <HeroSection hero={data.hero} />

      <main>
        <section className="section section-tight">
          <StatusBanner
            usingFallbackContent={data.apiStatus.usingFallbackContent}
            unavailableSections={data.apiStatus.unavailableSections}
          />
          {isLoading || isFetching ? <p className="loading-note">{messages.loading.refreshingRestaurantData}</p> : null}
        </section>

        <HighlightsSection highlights={data.highlights} />
        <StorySection
          title={data.story.title}
          paragraphs={data.story.paragraphs}
          bullets={data.story.bullets}
        />
        <MenuSection menu={data.menu} />
        <GallerySection gallery={data.gallery} />
        <VisitSection
          address={data.hero.address}
          mapQuery={data.hero.mapQuery}
          phone={data.hero.phone}
          email={data.hero.email}
          hours={data.hours}
        />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
