<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "AdditionalInformation",
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

  <div class="bg-graylight shodow rounded-lg relative my-2 p-6">
    <h3 class=" text-lg font-bold">{{ $t('rfq.Additional information') }}</h3>
    <p class="py-1">{{ $t('rfq.Additional Details') }}: <strong class="text-sm">{{ rfq?.additional_details }}</strong>
    </p>
    <p class="py-1">{{ $t('rfq.Attachments') }}: </p>
    <div class="lg:flex">

      <template v-for="file in rfq?.attachment">
        <p class="w-full  col-span-full"
           v-if="['doc','docx','csv','pdf','xlsx','lsx'].includes(file.extension)">
          <a class="underline" :href="file.original_url">{{ file.file_name }}</a>

        </p>

        <img v-else class="border border-smooth m-2" style="width:40px; height:40px; object-fit: cover;"
             :src="file.original_url"
             :alt="file.name">
      </template>

    </div>
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
