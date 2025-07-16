export const MainPronunciation = () => import('../..\\components\\MainPronunciation.vue' /* webpackChunkName: "components/main-pronunciation" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../..\\components\\NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const PronunciationApp = () => import('../..\\components\\PronunciationApp.vue' /* webpackChunkName: "components/pronunciation-app" */).then(c => wrapFunctional(c.default || c))
export const ResultModal = () => import('../..\\components\\ResultModal.vue' /* webpackChunkName: "components/result-modal" */).then(c => wrapFunctional(c.default || c))
export const ShowEndScoresModal = () => import('../..\\components\\ShowEndScoresModal.vue' /* webpackChunkName: "components/show-end-scores-modal" */).then(c => wrapFunctional(c.default || c))
export const ShowScoresModal = () => import('../..\\components\\ShowScoresModal.vue' /* webpackChunkName: "components/show-scores-modal" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../..\\components\\Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const WordCard = () => import('../..\\components\\WordCard.vue' /* webpackChunkName: "components/word-card" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
