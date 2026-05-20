import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import FloatingNav from '../components/FloatingNav.vue'
import PCMenu from '../components/PCMenu.vue'
import CategorySidebar from '../components/CategorySidebar.vue'
import SignedByDirectory from '../components/SignedByDirectory.vue'
import TrafficStopShowcase from '../components/TrafficStopShowcase.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('SignedByDirectory', SignedByDirectory)
    ctx.app.component('TrafficStopShowcase', TrafficStopShowcase)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h('div', [
        h(FloatingNav),
        h(PCMenu),
        h(CategorySidebar)
      ])
    })
  }
}
