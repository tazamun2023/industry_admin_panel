<template>
  <data-page
    ref="dataPage"
    set-api="rejectReasons"
    get-api="rejectReasons"
    route-name="rejection-reasons"
    method="put"
    :name="$t('setting.rejection-reasons')"
    gate="manage_initial_setting"
    manage_gate="manage_initial_setting"
    :validation-keys="['description.ar','description.en','type']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">

      <lang-input :hasError="hasError" type="text" :title="$t('rejectReasons.Reason')"
                  :valuesOfLang="result.description"
                  @updateInput="updateInput"></lang-input>

      <div class="grid grid-cols-1  md:grid-cols-2  gap-1 md:gap-2 ">
        <div class="py-2 ">
          <custom-select v-model="result.type"
                         :value_text="'name'"
                         :options="filters.reject_reasons_types"
                         label="Rejection Type"
                         non_select_option="Select Type">

          </custom-select>
        </div>
        <div class="py-2">
          <custom-select v-model="result.group"
                         :value_text="'name'"
                         :options="filters.reject_reasons_types.find(t=>t.id==result.type)?.groups??[]"
                         non_select_option="Select Rejection Groups"
                         label="Rejection Groups"></custom-select>
        </div>


      </div>


      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
            <span class="mr-15">
              {{ $t('app.Active') }}
            </span>
          <SwitchToggle v-model="result.status"/>

        </div>
      </div>
    </template>
  </data-page>
</template>

<script>

import DataPage from "~/components/partials/DataPage";
import util from "~/mixin/util"
import Dropdown from '~/components/Dropdown'
import {mapGetters, mapActions} from 'vuex'
import LangInput from "../../components/langInput.vue";
import SwitchToggle from "../../components/SwitchToggle.vue";
import CustomSelect from "../../components/CustomSelect.vue";

export default {
  name: "Cities",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        type: '',
        group: '',
        description: {'ar': '', 'en': ''},
        country_id: '',
        status: '',
      }
    }
  },
  mixins: [util],
  components: {
    CustomSelect,
    SwitchToggle,
    LangInput,
    DataPage,
    Dropdown
  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('common', ['filters']),
  },
  methods: {
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        // this.emptyAllList('allCategories')
        this.$router.push({path: `/rejection-reasons`})
      }
      this.result = evt
    },
    updateInput(input, language, value) {

      this.$set(input, language, value);
    },


  },
  async mounted() {

  }

}
</script>

<style scoped>

</style>
