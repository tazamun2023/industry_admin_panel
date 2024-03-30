import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAV1g7kB_iY7H3BNjgtbc7Aaa8q1_isDJA',
    libraries: 'places',
    installComponents: true
  }
})
