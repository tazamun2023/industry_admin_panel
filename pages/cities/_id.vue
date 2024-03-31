<template>
  <data-page
    ref="dataPage"
    set-api="setCity"
    get-api="getCity"
    set-image-api="setCityImage"
    route-name="cities"
    method="put"
    :name="$t('city.city')"
    gate="manage_shipment_setting"
    :validation-keys="['name.ar','name.en','country_id']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">

      <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="result.name"
                  @updateInput="updateInput"></lang-input>

      <div class="input-wrapper">
        <span class="mr-15">{{ $t('title.select_country') }}</span>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.country_id"
          :options="allCountries"
          label="name"
          :reduce="c => c.id"
          :placeholder="$t('title.select_country')"
          class="custom-select"
        ></v-select>

        <span
          class="error"
          v-if="!!!result.country_id && hasError"
        >
          {{ $t('category.req', {type: $t('city.country')}) }}
        </span>
      </div>


      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
            <span class="mr-15">
              {{ $t('global.status') }}
            </span>

          <dropdown
            :selectedKey="`${result.status}`"
            :options="statusObj"
            @clicked="dropdownSelected"
          />
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

export default {
  name: "Cities",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        name: {'ar': '', 'en': ''},
        country_id: '',
        status: '',
      }
    }
  },
  mixins: [util],
  components: {
    LangInput,
    DataPage,
    Dropdown
  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('common', ['allCountries'])
  },
  methods: {

    updateInput(input, language, value) {

      this.$set(input, language, value);
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.emptyAllList('allCategories')
      }
      this.result = evt
    },

    ...mapActions('common', ['getAllCountries', 'emptyAllList'])
  },
  async mounted() {
    try {
      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
    } catch (e) {
      return this.$nuxt.error(e)
    }

  }
}
</script>

<style scoped>

</style>
