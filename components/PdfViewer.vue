<template>
  <div :class="customClass">
    <div v-if="maxRetries>=3">
      <a class="underline flex flex-row gap-4" target="_blank" :href="pdfUrl">  <span>{{$t('prod.download')}}</span> <img src="~/assets/icon/pdf.svg" class="w-5 h-5"> </a>
    </div>
    <iframe v-else
            ref="iframe"
            @load="onIframeLoad"
            @error="onIframeError"
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
    },
    customClass: {
      type: String,
      default: " pdf-viewer"
    }
  },
  data() {
    return {

      retryCount: 0,
      maxRetries: 3, // Maximum number of retry attempts
      iframeSrc: this.pdfUrl, // Replace with your iframe source
      iframeLoaded: false,
    };
  },
  methods: {
    onIframeLoad() {
      this.iframeLoaded = true;
      this.retryCount = 0; // Reset retry count on successful load
    },
    onIframeError() {
      this.retryCount++;
      if (this.retryCount <= this.maxRetries) {
        this.reloadIframe();
      } else {
        console.error('Failed to load iframe after multiple attempts.');
      }
    },
    reloadIframe() {
      this.iframeLoaded = false;
      console.error('Failed to load ' + this.retryCount);
      // Force a reload by changing the src attribute slightly
      const iframe = this.$refs.iframe;
      iframe.src = '';
      this.$nextTick(() => {
        iframe.src = this.pdfUrlWithViewer;
      });
    }
  },
  computed: {
    pdfUrlWithViewer() {
      // Use a viewer like Google Docs to embed PDFs if direct embedding doesn't work
      // return this.pdfUrl;
      if (this.pdfUrl.includes('localhost') || this.pdfUrl.includes('.test')) {
        return this.pdfUrl;
      } else
        return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(this.pdfUrl)}`;
    }
  },

}
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100vh;
}
</style>
