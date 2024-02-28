<template>
  <data-page
    ref="dataPage"
    set-api="FAQ"
    get-api="FAQ"
    method="put"
    route-name="FAQ"
    :name="$t('color.color')"
    gate="brand"
    :validation-keys="['questions.ar','questions.en']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <lang-input :hasError="hasError" type="text" :title="$t('global.questions')" :valuesOfLang="result.questions"
                  @updateInput="updateInput"></lang-input>


      <lang-input type="text" :title="$t('global.answers')" :valuesOfLang="result.answers"
                  @updateInput="updateInput"></lang-input>

    </template>
  </data-page>
</template>

<script>

import DataPage from "~/components/partials/DataPage";
import util from "~/mixin/util"
import Dropdown from '~/components/Dropdown'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "FAQ",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        questions: {'ar': '', 'en': ''},
        answers: {'ar': '', 'en': ''},
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
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.emptyAllList('allCategories')
      }
      this.result = evt
    },

    dropdownSelected(data) {
      this.result.status = data.key
    },
    ...mapActions('common', ['getAllList', 'emptyAllList'])
  },
  async mounted() {

  }
}
</script>

<style scoped>

</style>
