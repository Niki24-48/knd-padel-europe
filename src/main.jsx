import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './styles-home-premium.css'
import './styles-premium.css'
import './seo-enhancements.css'
import './visual-pages.css'
import './why-knd.css'
import './editorial-hub.css'
import './contact-modal.css'

const root = document.getElementById('root')
const tree = <StrictMode><App /></StrictMode>

// Prerendered public pages contain the exact markup from App. Hydrate that
// markup instead of discarding it and flashing a separate static template.
// The WebGL configurator and fallback 404 remain client-only.
if (root?.dataset.kndSsr === 'true') hydrateRoot(root, tree)
else createRoot(root).render(tree)
