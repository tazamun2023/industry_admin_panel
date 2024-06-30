<template>
  <div>
    <div v-if="vendorList" class="my-5">
      <div v-if="type=='return_polices'">
        <h4 class="text-primary my-1">{{ $t('polices.LastUpdate') }}: {{ vendorList?.police_update_at }}</h4>

        <h5 class="text-primary my-1">{{ $t('polices.return_polices') }}: {{ $t('app.ar') }} </h5>

        <div v-html="vendorList.return_polices.ar"></div>
        <h5 class="text-primary my-1">{{ $t('polices.return_polices') }}: {{ $t('app.en') }} </h5>
        <div v-html="vendorList.return_polices.en"></div>

      </div>
      <div v-if="type=='documents'">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1 ">
            <h5 class="text-primary mb-5">{{ $t('CompanyProfiles.VatCertificate') }}: </h5>
            <lazy-image class="w-full" :lazy-src="vendorList.vat_certificate"></lazy-image>
          </div>
          <div class="col-span-2 md:col-span-1 ">
            <h5 class="text-primary mb-5">{{ $t('CompanyProfiles.Licence') }}: </h5>
            <lazy-image class="w-full" :lazy-src="vendorList.licence"></lazy-image>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import LazyImage from "../LazyImage.vue";

export default {
  name: 'VendorPolices',
  components: {LazyImage},
  data() {
    return {}
  },
  props: {
    vendor_id: {
      type: String,
      required: true
    },
    type: {
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
