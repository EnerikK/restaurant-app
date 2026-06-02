import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryProvider } from './components/QueryProvider'
import { I18nProvider } from './i18n/I18nProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </I18nProvider>
  </StrictMode>,
)
