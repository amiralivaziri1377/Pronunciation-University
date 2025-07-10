export { default as MainPronunciation } from '../..\\components\\MainPronunciation.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as PronunciationApp } from '../..\\components\\PronunciationApp.vue'
export { default as ResultModal } from '../..\\components\\ResultModal.vue'
export { default as ShowEndScoresModal } from '../..\\components\\ShowEndScoresModal.vue'
export { default as ShowScoresModal } from '../..\\components\\ShowScoresModal.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as WordCard } from '../..\\components\\WordCard.vue'

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
