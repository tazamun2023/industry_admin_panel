<template>
  <data-page
    ref="dataPage"
    set-api="NEWS"
    get-api="NEWS"
    method="put"
    route-name="buisness-news"
    :name="$t('bnews.news')"
    gate="view_content"  manage_gate="manage_content"
    :validation-keys="['title.ar','title.en', 'short_description.ar', 'short_description.en']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar">
        <div class="card">
<!--          <div class="title p-2 border-b border-smooth flex justify-between">-->
<!--            <h3>Add Buisness News </h3>-->
<!--            <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>-->
<!--          </div>-->
          <form class="p-4" action="">
            <div class="my-2 input-wrapper">
              <!--          <input type="text" placeholder="Title here">-->
              <lang-input :hasError="hasError" type="text" :title="$t('bnews.News Title')" :valuesOfLang="result.title"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="input-wrapper my-2">
              <!--          <textarea name="" id="" cols="30" rows="10"></textarea>-->
              <lang-input :hasError="hasError" type="textarea" :title="$t('bnews.Short Details')"
                          :valuesOfLang="result.short_description"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="input-wrapper my-2">
              <!--          <textarea name="" id="" cols="30" rows="10"></textarea>-->
              <lang-input :hasError="hasError" type="textarea" :title="$t('bnews.News Details')"
                          :valuesOfLang="result.description"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="my-2 input-wrapper">
              <label for="">Upload Image</label>
              <upload-files :old_images="result.image" @updateInput="saveAttachment"></upload-files>
              <!--          <input type="file" name="" id="">-->
            </div>
          </form>
        </div>
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
      this.result.image = images[0]
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
