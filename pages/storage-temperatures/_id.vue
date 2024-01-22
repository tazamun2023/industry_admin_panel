<template>
  <data-page
    ref="dataPage"
    set-api="setStorageTems"
    get-api="getStorageTem"
    set-image-api="setCategoryImage"
    route-name="storage-temperatures"
    :name="$t('storagetem.create')"
    gate="category"
    :validation-keys="['name.ar','name.en']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="result.name"
                  @updateInput="updateInput"></lang-input>
    </template>
  </data-page>
</template>

<script>

  import DataPage from "~/components/partials/DataPage";
  import util from "~/mixin/util"
  import Dropdown from '~/components/Dropdown'
  import {mapGetters, mapActions } from 'vuex'

  export default {
    name: "storage-temperatures",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          name: {'ar': '', 'en': ''},
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

      updateInput(input, language, value) {

        this.$set(input, language, value);
      },

      resultData(evt){
        if(this.$route?.params?.id === 'add'){
          this.emptyAllList('allCategories')
        }
        this.result = evt
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
