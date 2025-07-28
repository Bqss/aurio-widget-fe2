import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Widget initialization function that can be called by aurio-widget.js
function initAurioWidget(targetElement: HTMLElement) {
  const app = mount(App, {
    target: targetElement,
  })
  return app
}

// Auto-initialize if #app element exists (for standalone usage)
const appElement = document.getElementById('app')
if (appElement) {
  initAurioWidget(appElement)
}

// Make the function globally available for the widget helper
;(window as any).initAurioWidget = initAurioWidget

// Export for ES module usage
export { initAurioWidget }
export default initAurioWidget