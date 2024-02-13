<template>
  <data-page
    ref="dataPage"
    set-api="setSiteSetting"
    route-name="site-setting"
    :name="$t('title.site')"
    gate="site_setting"
    :result="result"
    @result="result = $event"
  >
    <template v-slot:form="{hasError}">

      <div
        v-if="loading"
        class="spinner-wrapper"
      >
        <spinner
          :radius="60"
          color="primary"
          class="mr-15"
        />
      </div>


      <div class="dply-felx f-wrap gap-10">

        <div class="input-wrapper b-b pb-15">
          <label class="mb-15">
            {{ $t('admin.headLogo') }}<span class="block">{{ $t('admin.sug') }}</span>
          </label>
          <img v-if="result.header_logo" :src="result.header_logo" alt="" class="w-1/4">
          <upload-files @updateInput="headerLogo"></upload-files>
        </div>

        <div class="input-wrapper b-b pb-15">
          <label class="mb-15">
            {{ $t('admin.fLogo') }}<span class="block">{{ $t('admin.sug') }}</span>
          </label>
          <img v-if="result.footer_logo" :src="result.footer_logo" alt="" class="w-1/4">
          <upload-files @updateInput="footerLogo"></upload-files>
        </div>

        <div class="input-wrapper b-b pb-15">
          <label class="mb-15">
            {{ $t('admin.lEmail') }}<span class="block">{{ $t('admin.sug') }}</span>
          </label>
          <img v-if="result.email_logo" :src="result.email_logo" alt="" class="w-1/4">
          <upload-files @updateInput="emailLogo"></upload-files>
        </div>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('admin.sName') }}</label>
        <lang-input :hasError="hasError" type="text" :title="$t('prod.title')"
                    :valuesOfLang="result.site_name"
                    @updateInput="updateInput"></lang-input>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('admin.sUrl') }}</label>
        <input
          type="text"
          :placeholder="$t('admin.sUrl')"
          v-model="result.site_url"
          :class="{invalid: !!!result.site_url && hasError}"
        >
      </div>

      <div class="input-wrapper">
        <label>{{ $t('category.mTitle') }}</label>
        <lang-input :hasError="hasError" type="text" :title="$t('prod.title')"
                    :valuesOfLang="result.meta_title"
                    @updateInput="updateInput"></lang-input>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('category.mDesc') }}</label>
<!--        <textarea-->
<!--          :placeholder="$t('category.mDesc')"-->
<!--          v-model="result.meta_description"-->
<!--          :class="{invalid: !!!result.meta_description && hasError}"-->
<!--        />-->
<!--        <span-->
<!--          class="error"-->
<!--          v-if="!!!result.meta_description && hasError"-->
<!--        >-->
<!--          {{ $t('category.req', { type: $t('category.mDesc')}) }}-->
<!--        </span>-->
        <lang-input :hasError="hasError" type="textarea" :title="$t('category.mDesc')"
                    :valuesOfLang="result.meta_description"
                    @updateInput="updateInput"></lang-input>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('admin.cpyr') }}</label>
<!--        <input-->
<!--          :placeholder="$t('admin.cpyr')"-->
<!--          v-model="result.copyright_text"-->
<!--          :class="{invalid: !!!result.copyright_text && hasError}"-->
<!--        />-->
        <lang-input :hasError="hasError" type="text" :title="$t('admin.cpyr')"
                    :valuesOfLang="result.copyright_text"
                    @updateInput="updateInput"></lang-input>
      </div>


      <div class="dply-felx f-wrap gap-10">
        <div class="input-wrapper grow">
          <label>{{ $t('admin.pColr') }}</label>
          <input
            type="text"
            :placeholder="$t('admin.pColr')"
            v-model="result.primary_color"
          >
        </div>


        <div class="input-wrapper grow">
          <label>{{ $t('admin.pHvr') }}</label>
          <input
            type="text"
            :placeholder="$t('admin.pHvr')"
            v-model="result.primary_hover_color"
          >
        </div>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('admin.styl') }}</label>
        <textarea
          :placeholder="$t('admin.styl')"
          v-model="result.styling"
        />

      </div>



    </template>
  </data-page>

</template>

<script>

  import DataPage from "~/components/partials/DataPage";
  import FileUpload from "~/components/FileUpload";
  import Spinner from "../components/Spinner";
  import ImageInput from "~/components/ImageInput";
  import util from "~/mixin/util";
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: "setting",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        loading: false,
        fileUploading: {
          'header_logo': false,
          'footer_logo': false,
          'email_logo': false,
        },
        result: {
          id: '',
          site_name: {ar: '', en: ''},
          site_url: '',
          meta_description: {ar: '', en: ''},
          meta_title: {ar: '', en: ''},
          copyright_text: {ar: '', en: ''},
          header_logo: '',
          header_logo_file: '',
          footer_logo: '',
          footer_logo_file: '',
          email_logo: '',
          email_logo_file: '',
          primary_color: '',
          primary_hover_color: '',
          styling: '',
        }
      }
    },
    props: {},
    mixins: [util],
    components: {
      ImageInput,
      Spinner,
      FileUpload,
      DataPage
    },
    computed: {
      ...mapGetters(['mediaStorage']),
    },
    methods: {
      updateInput(input, language, value) {
        this.$set(input, language, value);
      },
      headerLogo(image) {
        this.result.header_logo_file = image
      },
      footerLogo(image) {
        this.result.footer_logo_file = image
      },

      emailLogo(image) {
        this.result.email_logo_file = image
      },

      async fetchingData() {
        try {
          this.loading = true

          const data = await this.getRequest({api: 'getSiteSetting'})

          if(data){
            this.result = data
          }

          this.loading = false
          } catch (e) {
            return this.$nuxt.error(e)
          }
        },
      async uploadFile(type, file, name = null){

        this.fileUploading[type] = true
        try {

          let params = {}
          if(file) {
            const fd = new FormData()
            fd.append('id', this.result.id)
            fd.append('photo', file)
            fd.append('type', type)
            params = fd
          } else {

            params['type'] = type
            params['id'] = this.result.id
            params['photo'] = name
          }

          const data = await this.setRequest({params: params, api: 'siteSettingUpload'})

          if(data){
            this.result = data
          }

        } catch (e) {
          return this.$nuxt.error(e)
        }
          this.fileUploading[type] = false
      },
      ...mapActions('common', ['setRequest', 'getRequest'])
    },

    async mounted() {
      await this.fetchingData()



    }
  }
</script>


