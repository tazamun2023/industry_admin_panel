<template>
  <data-page
    ref="dataPage"
    set-api="setCity"
    get-api="getCity"
    set-image-api="setCityImage"
    route-name="cities"
    :name="$t('country.country')"
    gate="brand"
    :validation-keys="['name']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">

      <lang-input :title="$t('city.name')" :valuesOfLang="result.name" @updateInput="updateInput"></lang-input>
      
      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('title.sc')}}</span>
          <dropdown
            v-if="allCountries"
            :default-null="true"
            :selectedKey="`${result.country_id}`"
            :options="allCountries"
            @clicked="countrySelected"
          />
        </div>
      </div>

      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
            <span class="mr-15">
              {{ $t('category.status') }}
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
        // name: '',
        name:{'ar':'','en':''},
        country_id: '',
        status: 1,
        image: ''
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
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
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
    countrySelected(data) {
      this.result.country_id = data.key
    },
    titleChanged() {
      this.result.slug = this.convertToSlug(this.result.title)
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    ...mapActions('common', ['getAllList', 'emptyAllList'])
  },
  async mounted() {
    if (!this.allCountries) {
      try {
        await this.getAllList({api: 'getAllCity', mutation: 'SET_ALL_COUNTRIES'})
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
