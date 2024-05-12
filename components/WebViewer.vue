<template>
  <div id="app">
  <div id='webviewer' ref='viewer'></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'WebViewer',
  props: {
    path: String,
    url: String
  },
  mounted: function () {
    import('@pdftron/webviewer').then(() => {

      WebViewer({
        path: '../webviewer',
        initialDoc: this.url, // replace with your own PDF file
        licenseKey: 'demo:1715430726718:7fcd3efb030000000074063c6f15644bbf7afecdb4ea6c049fd062743c'  // sign up to get a free trial key at https://dev.apryse.com
      }, this.$refs.viewer).then((instance) => {
        // call apis here
      });
    })
  }
}
</script>


<style>
#webviewer {
  height: 100vh;
}
</style>
