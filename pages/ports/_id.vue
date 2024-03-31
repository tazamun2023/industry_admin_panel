<template>
  <data-page
    ref="dataPage"
    set-api="setPort"
    get-api="getPort"
    empty-store-variable="allCitiesById"
    set-image-api="setCategoryImage"
    route-name="ports"
    :name="$t('port.port')"
    gate="manage_shipment_setting"
    :validation-keys="['name.ar','name.en', 'type', 'country_id', 'city_id']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="result.name"
                  @updateInput="updateInput"></lang-input>

     <div class="input-wrapper">
          <span class="mr-15">{{ $t('title.select_type') }}</span>

          <v-select
            :dir="$t('app.dir')"
            v-model="result.type"
            :options="['sea','air','land']"
            :placeholder="$t('title.select_type')"
            class="custom-select"
          ></v-select>
        <span
          class="error"
          v-if="!!!result.type && hasError"
        >
          {{ $t('global.req', { type: $t('global.type')}) }}
        </span>
      </div>

      <div class="input-wrapper">

          <span class="mr-15">{{ $t('title.select_country') }}</span>

          <v-select
            :dir="$t('app.dir')"
            v-model="result.country_id"
            :options="allCountries"
            label="name"
            :reduce="c => c.id"

            @input="countrySelected"
            :placeholder="$t('title.select_country')"
            class="custom-select"
          ></v-select>

        <span
          class="error"
          v-if="!!!result.country_id && hasError"
        >
          {{ $t('category.req', { type: $t('country.country')}) }}
        </span>
      </div>

      <div class="input-wrapper">
          <span class="mr-15">{{ $t('title.select_city') }}</span>
          <v-select
            :dir="$t('app.dir')"
            v-model="result.city_id"
            :options="allCitiesById"
            label="name"
            :reduce="c => c.id"
            :placeholder="$t('title.select_city')"
            class="custom-select"
          ></v-select>
        <span
          class="error"
          v-if="!!!result.city_id && hasError"
        >
          {{ $t('global.req', { type: $t('city.city')}) }}
        </span>
      </div>


      <div class="input-wrapper">

        <label>{{ $t('global.lat') }}</label>
        <input
          type="text"
          :placeholder="$t('global.lat')"
          v-model="result.lat"
          ref="lat"
        >
      </div>

      <div class="input-wrapper">

        <label>{{ $t('global.lang') }}</label>
        <input
          type="text"
          :placeholder="$t('global.lang')"
          v-model="result.lang"
          ref="lang"
        >
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
  import {mapGetters, mapActions } from 'vuex'
  import ListPage from "@/components/partials/ListPage.vue";

  export default {
    name: "ports",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          name: {'ar': '', 'en': ''},
          type: '',
          country_id: '',
          city_id: '',
          lat: '',
          lang: '',
          status:''
        },
        city :'Select',
        selected: 'sea',
      }
    },
    mixins: [util],
    components: {
      ListPage,
      DataPage,
      Dropdown
    },
    computed: {
      ...mapGetters('language', ['currentLanguage']),
      ...mapGetters('common', ['allCountries', 'allCitiesById'])
    },
    methods: {
      updateInput(input, language, value) {
        this.$set(input, language, value);
      },

      resultData(evt){
        if(this.$route?.params?.id === 'add'){
          this.emptyAllList(['getAllCountries', 'getCitiesById'])
        }
        this.result = evt
      },

      dropdownSelected(data){
        this.result.status = data.key
      },

      countrySelected() {
        let countryId= this.result.country_id;
        try {
           this.getCitiesById({id: countryId,api: 'getAllCityById', mutation: 'SET_ALL_Cities' })
        } catch (e) {
          return this.$nuxt.error(e)
        }

      },

      ...mapActions('common', ['getAllCountries', 'emptyAllList', 'getCitiesById'])
    },

    async mounted() {

        try {
          await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(()=>{
            this.result.country_id=187
            this.countrySelected()

          })
        } catch (e) {
          return this.$nuxt.error(e)
        }



    }
  }
</script>

<style scoped>

</style>
