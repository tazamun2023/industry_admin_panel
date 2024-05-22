<template>
  <img
    :data-src="lazySrc"
    :style="style"
    :alt="alt"
    :title="title"
    @error="onError"
    class="lazy-img"
    height="50"
    width="50"
  >
</template>

<script>
import lozad from 'lozad'
import util from '~/mixin/util'

export default {
  name: 'LazyImage',
  props: {
    alt: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: '#d9f4eb',
    },
    lazySrc: {
      type: String,
      default: null,
    },
    lazySrcset: {
      type: String,
      default: null,
    },

  },
  data() {
    return {
      loading: true,
    }
  },
  mixins: [util],
  computed: {
    aspectRatio() {
      if (!this.width || !this.height) return null
      return (this.height / this.width) * 100
    },
    style() {
      // const style = { backgroundColor: this.backgroundColor }
      const style = {}

      if (this.width) {
        style.width = `${this.width}px`
        if (!this.height) {
          style.height = `${this.width * 0.66}px`
        }
      }
      const applyAspectRatio = this.loading && this.aspectRatio

      if (applyAspectRatio) {
        style.height = (this.height) ? `${this.height}px` : `${this.applyAspectRatio}px`
      }
      return style
    },

  },

  mounted() {
    this.handelLazyLoad()

  },
  watch: {
    lazySrc: {
      handler(newValue) {
        this.$el.src = this.$el.getAttribute('data-src')
      },
      deep: true
    }

  },
  methods: {
    handelLazyLoad(new_url = "") {
      const setLoadingState = () => {

        this.loading = false
        this.$el.style.opacity = 1
      }

      this.$el.addEventListener('load', setLoadingState)
      this.$once('hook:destroyed', () => {
        this.$el.removeEventListener('load', setLoadingState)
      })

      const observer = lozad(this.$el, {
        load: function (el) {
          console.log('0000 data src')
          console.log(el.getAttribute('data-src'))
          console.log("new_url")
          console.log(new_url)

          // Custom implementation to load an element
          if (new_url !== "")
            el.src = new_url
          else
            el.src = el.getAttribute('data-src')
        }
      })
      observer.observe()
    },
    onError(e) {

      e.target.src = this.getImageURL()
    },
  },
};
</script>
