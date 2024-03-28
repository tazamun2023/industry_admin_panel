<template>
  <data-page
    ref="dataPage"
    set-api="setCategory"
    get-api="getCategory"
    set-image-api="setCategoryImage"
    route-name="categories"
    :name="$t('country.country')"
    gate="manage_shipment_setting"
    manage_gate="manage_shipment_setting"
    :validation-keys="['name', 'iso', 'phonecode']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="input-wrapper">

        <label>{{ $t('country.name') }}</label>
        <input
          type="text"
          :placeholder="$t('country.name')"
          v-model="result.name"
          ref="name"
          :class="{invalid: !!!result.name && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.title && hasError"
        >
          {{ $t('category.req', { type: $t('index.title')}) }}
        </span>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('country.iso') }}</label>
        <input
          type="text"
          :placeholder="$t('country.iso')"
          v-model="result.iso"
          :class="{invalid: !!!result.iso && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.iso && hasError"
        >
          {{ $t('country.req', { type: $t('country.iso')}) }}
        </span>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('country.iso3') }}</label>
        <input
          type="text"
          :placeholder="$t('country.iso3')"
          v-model="result.iso"
          :class="{invalid: !!!result.iso && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.iso && hasError"
        >
          {{ $t('country.iso3', { type: $t('country.iso3')}) }}
        </span>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('country.phonecode') }}</label>
        <input
          type="text"
          :placeholder="$t('country.phonecode')"
          v-model="result.phonecode"
          :class="{invalid: !!!result.phonecode && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.iso && hasError"
        >
          {{ $t('country.phonecode', { type: $t('country.phonecode')}) }}
        </span>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('country.currency_code') }}</label>
        <input
          type="text"
          :placeholder="$t('country.currency_code')"
          v-model="result.currency_code"
          :class="{invalid: !!!result.currency_code && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.iso && hasError"
        >
          {{ $t('country.currency_code', { type: $t('country.currency_code')}) }}
        </span>
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
  import {mapGetters, mapActions } from 'vuex'

  export default {
    name: "countries",
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
