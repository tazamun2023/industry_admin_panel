<template>
  <div>
    <h1>PDF Viewer</h1>
    <PdfViewer :pdfUrl="pdfUrl" />
  </div>
</template>

<script>
import PdfViewer from '~/components/PdfViewer.vue'

export default {
  components: {
    PdfViewer
  },
  data() {
    return {
      pdfUrl: 'https://back.industry.com.sa/storage/363/1fd92904-0eb0-4307-83c6-d808989cbaea.pdf' // Replace with your PDF URL
    }
  }
}
</script>

<style>
/* Add any additional styling here */
</style>
