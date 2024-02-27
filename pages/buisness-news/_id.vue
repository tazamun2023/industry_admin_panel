<template>
  <div class="tab-sidebar">
    <div class="card">
      <div class="title p-2 border-b border-smooth flex justify-between">
        <h3>Add Buisness News </h3>
        <nuxt-link :to="`/buisness-news`" class="button primary-btn">List</nuxt-link>
      </div>
      <form class="p-4" action="">
        <div class="my-2 input-wrapper">
          <!--          <input type="text" placeholder="Title here">-->
          <lang-input :hasError="hasError" type="text" :title="$t('bnews.News Title')" :valuesOfLang="result.title"
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
          <upload-files @updateInput="saveAttachment"></upload-files>
<!--          <input type="file" name="" id="">-->
        </div>
        <div class="text-end">
          <button class="button primary-btn" @click.prevent="doSubmit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LangInput from "@/components/langInput.vue";

export default {
  name: 'BusinessNews',

  components:{
    LangInput
  },

  data() {
    return {
      hasError: false,
      setApi: 'setBusinessNews',
      result:{
        title: {ar: '', en: ''},
        description: {ar: '', en: ''},
        images: []
      }
    }
  },

  methods: {
    doSubmit(){

      this.checkForm()
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    saveAttachment(images) {
      console.log(images)
      // this.result.rfq_attachments = rfq_attachments
      this.result.images = images
    },

    async checkForm() {

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        delete this.result.created_at
        delete this.result.updated_at
        const data = await this.setById({id: this.id, params: {result: this.result}, api: this.setApi})
        // if (data) {
        //
        //   this.result = Object.assign({}, data)
        //   // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/' + this.result.id}`})
        //   this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/'}`})
        // }
        this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/buisness-news'}`})
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
