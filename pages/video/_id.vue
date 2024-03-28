<template>
  <data-page
    ref="dataPage"
    set-api="VideoGallery"
    get-api="VideoGallery"
    method="put"
    route-name="video"
    :name="$t('global.video')"
    gate="view_content"  manage_gate="manage_content"
    :validation-keys="['url']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar">
        <form class="p-4" action="">
          <div class="my-2 input-wrapper">
            <!--          <input type="text" placeholder="Title here">-->
            <input class="form-control" name="e.g. Macbook Pro 2019" :placeholder="$t('global.url')" type="text"
                   v-model="result.url">
          </div>
        </form>
      </div>
    </template>
  </data-page>
</template>

<script>
import LangInput from "@/components/langInput.vue";
import DataPage from "@/components/partials/DataPage.vue";

export default {
  name: 'BusinessNews',

  components: {
    DataPage,
    LangInput,
  },

  data() {
    return {
      hasError: false,
      setApi: 'setBusinessNews',
      result: {
        id: '',
        attachment_type: 'file_upload',
        vendor_id: this.$store.getters["admin/profile"].vendor_id,
        title: {ar: '', en: ''},
        short_description: {ar: '', en: ''},
        description: {ar: '', en: ''},
        image: [],
        keywords: [],
        file: '',
      }
    }
  },

  methods: {
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        // this.emptyAllList('allCategories')
        this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/buisness-news'}`})
      }
      this.result = evt
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    saveAttachment(images) {
      console.log(images)
      // this.result.rfq_attachments = rfq_attachments
      this.result.file = images
      // this.result.file = images
    },
  },

  computed: {
    isAdding() {
      return isNaN(this.$route?.params?.id)
    },

    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
  }
}
</script>
