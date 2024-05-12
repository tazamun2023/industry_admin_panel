<template>
  <WebViewer :path="`${publicPath}webviewer`" url="https://back.industry.com.sa/storage/266/57570551-a195-4877-99b7-3f6009ae811e.pdf"></WebViewer>
</template>

<script>
/* eslint-disable */
import WebViewer from '../components/WebViewer.vue'
export default {
 name: 'pdf',
  components:{
    WebViewer
  },
  data(){
   return {
     publicPath: process.env.BASE_URL
   }
  }

}
</script>


<style>

</style>

