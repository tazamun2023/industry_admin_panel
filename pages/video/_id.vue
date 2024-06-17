<template>
  <data-page
    ref="dataPage"
    set-api="VideoGallery"
    get-api="VideoGallery"
    method="put"
    route-name="video"
    :name="$t('global.video')"
    gate="view_content"
    manage_gate="manage_content"
    :validation-keys="['url']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar">
        <ValidationObserver class="w-full card p-4" v-slot="{ invalid }">
        <form class="p-4" action="">
          <ValidationProvider class="w-full" name="URL"
                              :rules="{ required:true, regex:  /^https?:\/\/(www\.)?youtube\.com/ }"
                               v-slot="{ errors }">
          <div class="my-2 input-wrapper">
            <input class="form-control" name=""

                   :placeholder="$t('global.url')" type="url"
                   v-model="result.url">
            <span class="error">{{ errors[0] }}</span>
          </div>
          </ValidationProvider>
        </form>
        </ValidationObserver>
      </div>
    </template>
  </data-page>
</template>

<script>
import LangInput from "@/components/langInput.vue";
import DataPage from "@/components/partials/DataPage.vue";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {extend} from 'vee-validate';

extend('url', {
  validate: value => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );
    return urlPattern.test(value);
  },
  message: 'The URL is not valid'
});

export default {
  name: 'BusinessNews',
  components: {
    DataPage,
    LangInput,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      hasError: false,
      setApi: 'setBusinessNews',
      result: {
        id: '',
        vendor_id: this.$store.getters["admin/profile"].vendor_id,
      }
    }
  },

  methods: {
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/buisness-news'}`})
      }
      this.result = evt
    },

  },

  computed: {

  }
}
</script>
