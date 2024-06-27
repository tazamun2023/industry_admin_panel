<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'
import LazyImage from "../LazyImage.vue";

export default {
  name: "AdditionalInformation",
  components: {LazyImage},
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
  methods: {
    isFiles(file) {
      return ['doc', 'docx', 'csv', 'pdf', 'xlsx', 'lsx'].includes(file.extension)
    }
  },
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
    <div class="flex flex-col">
      <div class="lg:flex">

        <template v-for="file in rfq?.attachment">

          <lazy-image v-if="!isFiles(file)" class="border border-smooth m-2"
                      style="width:40px; height:40px; object-fit: cover;"
                      :lazySrc="file.original_url"
                      :alt="file.name"/>
        </template>


      </div>
      <div class="flex flex-col">
        <template v-for="file in rfq?.attachment">
          <p class="w-full  col-span-full"
             v-if="isFiles(file)">
            <a class="underline" :href="file.original_url">{{ file.file_name }}</a>

          </p>

        </template>

      </div>
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
