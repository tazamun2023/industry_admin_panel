<script>
import DataPage from "@/components/partials/DataPage.vue";
import LangInput from "@/components/langInput.vue";

export default {
  name: 'BusinessNews',
  components: {
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
      console.log(images)
      // this.result.rfq_attachments = rfq_attachments
      this.result.images = images
      // this.result.file = images
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        // this.emptyAllList('allCategories')
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

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        const data = await this.setById({id: this.id, params: {result: this.result}, api: this.setApi})
        // if (data) {
        //
        //   this.result = Object.assign({}, data)
        //   // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
        //   this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
        // }
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
    :name="$t('bnews.news')"
    gate="manage_content"
    manage_gate="manage_content"
    :validation-keys="['title.ar','title.en']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar">
        <div class="card">
<!--          <div class="title p-2 border-b border-smooth flex justify-between">-->
<!--            <h3>Add Certificate </h3>-->
<!--            <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>-->
<!--          </div>-->
          <form class="p-4" action="">
            <div class="my-2 input-wrapper">
              <label for="">Certificate Title</label>
<!--              <input type="text" placeholder="Title here">-->
              <lang-input :hasError="hasError" type="text" :title="$t('bnews.News Title')" :valuesOfLang="result.title"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="my-2 input-wrapper">
              <label for="">Organization</label>
<!--              <input type="text" placeholder="Title here">-->
              <lang-input :hasError="hasError" type="text" :title="$t('bnews.News Title')" :valuesOfLang="result.organization"
                          @updateInput="updateInput"></lang-input>
            </div>
            <div class="my-2 input-wrapper">
              <label for="">Upload Certificate</label>
              <img :src="result.file" style="width: 200px; height: 200px" alt="">
              <upload-files @updateInput="saveAttachment"></upload-files>
<!--              <input type="file" name="" id="">-->
            </div>

<!--            <div class="text-end">-->
<!--              <button class="button primary-btn">Save</button>-->
<!--            </div>-->
          </form>
        </div>
      </div>
    </template>
  </data-page>

    </template>

    <style scoped>

    </style>
