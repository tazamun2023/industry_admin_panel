<script>
import DataPage from "@/components/partials/DataPage.vue";
import LangInput from "@/components/langInput.vue";
import UploadFiles from "../../components/UploadFiles.vue";

export default {
  name: 'CreateCertificates',
  components: {
    UploadFiles,
    DataPage,
    LangInput,
  },

  data() {
    return {
      hasError: false,
      is_loading: false,
      result:{
        title: {ar: '', en: ''},
        organization: {ar: '', en: ''},
        vendor_id: this.$store.getters["admin/profile"].vendor_id,
        images: [],
        file: '',
      }
    }
  },

  methods: {
    saveAttachment(images) {
      this.result.images = images
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/certificate'}`})
      }
      this.result = evt
    },
    doSubmit() {
      this.is_loading = true
      this.checkForm()
      this.is_loading = false
    },
    async checkForm() {
      this.formSubmitting = true
      try {

        const data = await this.setById({id: this.id, params: {result: this.result}, api: this.setApi})
        this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/pending-approval'}`})
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.formSubmitting = false
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

<template>
  <data-page
  v-if="$can('manage_content')"
    ref="dataPage"
    set-api="Certificate"
    get-api="Certificate"
    method="put"
    route-name="certificate"
    :name="$t('profile.certificate')"
    gate="manage_content"
    manage_gate="manage_content"
    :validation-keys="['title.ar','title.en']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar">
        <div class="card">
          <form class="p-4" action="">
            <div class="my-2 input-wrapper">
              <lang-input :hasError="hasError" type="text" :title="$t('global.title')" :valuesOfLang="result.title"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="my-2 input-wrapper">
              <lang-input :hasError="hasError" type="text" :title="$t('global.organization')" :valuesOfLang="result.organization"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="my-2 input-wrapper">
              <label for="">Upload Certificate</label>
              <img v-show="result.file?.length > 0" :src="result.file" style="width: 200px; height: 200px" alt="">
              <upload-files @updateInput="saveAttachment"></upload-files>
            </div>
          </form>
        </div>
      </div>
    </template>
  </data-page>

    </template>

    <style scoped>

    </style>
