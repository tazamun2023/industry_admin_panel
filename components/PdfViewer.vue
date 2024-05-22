<template>
  <div class="pdf-viewer">
    <iframe
      v-if="pdfUrl"
      :src="pdfUrlWithViewer"
      width="100%"
      height="100%"
      style="border: none;"
    ></iframe>
  </div>
</template>
<script>
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    pdfUrlWithViewer() {
      // Use a viewer like Google Docs to embed PDFs if direct embedding doesn't work
      // return this.pdfUrl;
      return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(this.pdfUrl)}`;
    }
  },
  methods: {


  }
}
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100vh;
}
</style>
