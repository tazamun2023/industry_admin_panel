<template>
  <div>
    <!--    <vendor-profile-data v-if="vendorList" :vendor="vendorList"></vendor-profile-data>-->

    <profile-statistics v-if="vendorList" :show-links="false" :show-profile="true"
                        :profile-data="vendorList"></profile-statistics>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import VendorProfileData from "./profileData.vue";
import ProfileStatistics from "../vendorDashboard/ProfileStatistics.vue";

export default {
  name: 'profile',
  components: {ProfileStatistics, VendorProfileData},
  data() {
    return {}
  },
  props: {
    vendor_id: {
      type: String,
      required: true
    }
  },
  watch: {},
  computed: {
    ...mapGetters('vendor', ['vendorList']),
  },
  methods: {
    ...mapActions('vendor', ['getAdminVendorData']),

  },

  async mounted() {

    try {
      if (!(this.vendorList && this.vendorList.id == this.vendor_id))
        await this.getAdminVendorData({id: this.vendor_id, params: {with_statistics: 1}, api: 'getVendor'})

    } catch (e) {
      return this.$nuxt.error(e)
    }
  }
}
</script>
