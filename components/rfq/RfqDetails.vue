<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'
import RFQProducts from "./RFQProducts.vue";
import ShippingDetails from "./ShippingDetails.vue";
import AdditionalInformation from "./AdditionalInformation.vue";

export default {
  name: "RfqDetails",
  components: {AdditionalInformation, ShippingDetails, RFQProducts},
  middleware: ['common-middleware', 'auth'],
  props: {
    rfq: Object,

  },
  data() {
    return {}

  },
  mixins: [util],
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {},
  async mounted() {
  }
}
</script>
<template>

  <div class="card pb-4">
    <div class="flex justify-between items-center px-4 py-3 bg-primary rounded-t">
      <div class="flex gap-4">
        <span class="font-bold text-white">RFQ{{rfq.id}} </span>
        <span class="bg-white p-2 rounded-lg leading-3 capitalize">{{ rfq.status_data?.name }}</span>
      </div>
      <div class="flex gap-4">
        <p class="text-white">{{ $t("rfq.Received quotes")}}<span class="font-bold">{{ rfq.received_quotes }}</span></p>
        <p class="text-white">{{ $t("rfq.Created on") }}<span class="font-bold"> {{rfq.expiry_date}}</span></p>
        <p class="text-white">{{ $t("rfq.Expires on") }}<span class="font-bold">{{rfq.created}}</span></p>
      </div>
    </div>
    <RFQProducts class="p-4" :show_summary="true" :rfq="rfq"></RFQProducts>
    <div class="grid grid-cols-2 px-4 gap-4">
      <ShippingDetails :rfq="rfq"></ShippingDetails>
      <AdditionalInformation :rfq="rfq"></AdditionalInformation>
    </div>
  </div>
</template>

