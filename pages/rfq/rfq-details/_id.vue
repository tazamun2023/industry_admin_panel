<template>

  <div v-if="$can('view_RFQ')">

    <h3>Rfq Details</h3>
    <rfq-details :rfq="rfq"></rfq-details>
    <!-- ========================== -->

    <!-- ========================== -->

    <div v-if="rfq.quotes?.length>0">
      <image-slider
        :image-count="rfq?.quotes.length"
        :per-view="1"
        :loop="true"
        :gap="15"
        :controls="false"
      >
        <template v-slot:content>
          <template v-for="(q,key) in rfq.quotes">
            <Quotation :key="key" :no="key+1" :quote="q" :rfq="rfq">
            </Quotation>

          </template>
        </template>
      </image-slider>

    </div>

  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import util from '~/mixin/util'
import {mapGetters, mapActions} from 'vuex'
import RFQProducts from "~/components/rfq/RFQProducts.vue";
import ShippingDetails from "@/components/rfq/ShippingDetails.vue";
import AdditionalInformation from "@/components/rfq/AdditionalInformation.vue";
import Quotation from "@/components/rfq/Quotation.vue";
import ImageSlider from "@/components/rfq/ImageSlider.vue";
import '@glidejs/glide/dist/css/glide.core.min.css';
import RfqDetails from "../../../components/rfq/RfqDetails.vue";

export default {
  name: "RFQDetails",
  components: {RfqDetails, ImageSlider, Quotation, AdditionalInformation, ShippingDetails, RFQProducts},
  middleware: ['common-middleware', 'auth'],
  mixins: [util],

  data() {
    return {
      loading: true,
      quoteModal: false,
      quoteRejectModal: false,
      hasFormError: false,
      formSubmitting: false,
      quoteId: '',
      rfq: []
    }
  },


  computed: {
    ...mapGetters('language', ['languages', 'currentLanguage']),
  },

  methods: {
    async fetchingData() {
      try {
        this.loading = true
        this.rfq = Object.assign({}, await this.getById({
          id: this.$route?.params.id,
          params: {time_zone: this.timeZone},
          api: 'getRFQ'
        }))
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },


    ...mapActions('common', ['setRequest', 'getById', 'setById']),
  },


  async mounted() {
    // new Glide('.glide').mount()
    await this.fetchingData()

    // this.fetchingData = true
    // const data = await this.getRfqDetails({
    //   payload: {
    //     id: this.$route?.params.id,
    //   },
    //   lang: this.currentLanguage.code
    // })
    // if (data?.status === 200) {
    //
    // }
    // this.fetchingData = false
  },
}
</script>
<style>

.shodow::before {
  content: '';
  position: absolute;
  left: 0px;
  top: 28px;
  /* width: calc(20% - 25px); */
  height: calc(20% - 10px);
  border-top: 5px solid #27436f;
  border-left: 5px solid #27436f;
}


.glide .glide-nav button {
  top: 7%;
}

.glide .glide-nav .prev-btn {
  html:lang(en) & {
    right: 60px;
    left: auto !important;
  }
}

.glide .glide-nav .next-btn {
  html:lang(ar) & {
    right: auto;
    left: 60px;
  }
}

@media only screen and (min-width: 991px) {
  .lg-d-flex {
    display: flex;
  }
}
</style>
