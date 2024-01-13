<template>
  <data-page
    ref="dataPage"
    set-api="setCategory"
    get-api="getCategory"
    set-image-api="setCategoryImage"
    route-name="barcode"
    :name="$t('barcode.barcode')"
    gate="category"
    :validation-keys="['name', 'iso', 'phonecode']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="input-wrapper">

        <label>{{ $t('barcode.barcode') }}</label>
        <input
          type="text"
          :placeholder="$t('barcode.name')"
          v-model="result.name"
          ref="name"
          :class="{invalid: !!!result.name && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.name && hasError"
        >
          {{ $t('barcode.name', { type: $t('index.title')}) }}
        </span>
      </div>
    </template>
  </data-page>
</template>

<script>

  import DataPage from "~/components/partials/DataPage";
  import util from "~/mixin/util"
  import Dropdown from '~/components/Dropdown'
  import {mapGetters, mapActions } from 'vuex'

  export default {
    name: "categories",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          title: '',
          status: 2,
          featured: 2,
          parent: '',
          slug: '',
          meta_description: '',
          in_footer: 2,
          meta_title: '',
          image: ''
        }
      }
    },
    mixins: [util],
    components: {
      DataPage,
      Dropdown
    },
    computed: {
      ...mapGetters('language', ['currentLanguage']),
      ...mapGetters('common', ['allCategories'])
    },
    methods: {
      resultData(evt){
        if(this.$route?.params?.id === 'add'){
          this.emptyAllList('allCategories')
        }
        this.result = evt
      },
      inFooterSelected(data) {
        this.result.in_footer = data.key
      },
      featuredSelected(data) {
        this.result.featured = data.key
      },
      categorySelected(data) {
        this.result.parent = data.key
      },
      titleChanged(){
        this.result.slug = this.convertToSlug(this.result.title)
      },
      dropdownSelected(data) {
        this.result.status = data.key
      },
      ...mapActions('common', ['getAllList', 'emptyAllList'])
    },
    async mounted() {
      if (!this.allCategories) {
        try {
          await this.getAllList({api: 'getAllCategories', mutation: 'SET_ALL_CATEGORIES'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
