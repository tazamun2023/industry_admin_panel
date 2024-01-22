<template>
  <data-page
    ref="dataPage"
    set-api="setTransportMode"
    get-api="getTransportMode"
    set-image-api="setCategoryImage"
    route-name="transportation-modes"
    :name="$t('transportation_mode.transportation_mode')"
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
    name: "transportation-modes",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          name: {'ar': '', 'en': ''}
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
    }
  }
</script>

<style scoped>

</style>
