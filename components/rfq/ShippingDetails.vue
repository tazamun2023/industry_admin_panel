<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ShippingDetails",
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
  <div class="bg-graylight shodow rounded-lg relative my-2 p-6 ">
    <h3 class=" text-lg font-bold">{{ $t('rfq.Shipping details') }}</h3>
    <p class="py-1"> {{ $t("rfq.Shipping country") }} : <strong class="text-sm text-primary">{{ rfq?.country?.name }}</strong></p>
    <p class="py-1">{{ $t("rfq.Shipping city") }} : <strong class="text-sm text-primary">{{ rfq?.city?.name }}</strong></p>
    <p class="py-1">{{ $t("rfq.Shipping terms") }} : <strong class="text-sm  text-primary">
      <template v-for="(term,index) in rfq?.shipmen_terms">
        <span>{{ term.name }}</span>
        <span class="mx-2" v-if="index+1<rfq?.shipmen_terms.length">,</span>

      </template>
    </strong></p>

  </div>

</template>

<style scoped>


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
</style>
