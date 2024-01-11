<template>
  <data-page
    ref="dataPage"
    set-api="setCategory"
    get-api="getCategory"
    set-image-api="setCategoryImage"
    route-name="port"
    :name="$t('port.port')"
    gate="category"
    :validation-keys="['name', 'iso', 'phonecode']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="input-wrapper">

        <label>{{ $t('port.port') }}</label>
        <input
          type="text"
          :placeholder="$t('port.name')"
          v-model="result.name"
          ref="name"
          :class="{invalid: !!!result.name && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.name && hasError"
        >
          {{ $t('port.name', { type: $t('index.title')}) }}
        </span>
      </div>
      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('port.type')}}</span>
          <select multiple class="border border-smooth text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="" id="">
            <option selected>Choose a port type</option>
            <option value="air">Air</option>
            <option value="sea">Sea</option>
            <option value="land">Land</option>
          </select>

        </div>
      </div>
      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('port.country')}}</span>
          <select multiple class="border border-smooth text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="" id="">
            <option selected>Choose a country</option>
            <option value="18">Bangladesh</option>
            <option value="187">Saudi Arabia</option>
          </select>

        </div>
      </div>
      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('port.city')}}</span>
          <select multiple class="border border-smooth text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="" id="">
            <option selected>Choose a city</option>
            <option value="18">Dhaka</option>
            <option value="187">Chittagon</option>
          </select>

        </div>
      </div>

      <div class="input-wrapper">

        <label>{{ $t('port.lat') }}</label>
        <input
          type="text"
          :placeholder="$t('port.lat')"
          v-model="result.port_code"
          ref="name"
          :class="{invalid: !!!result.lat && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.name && hasError"
        >
          {{ $t('port.lat', { type: $t('port.lat')}) }}
        </span>
      </div>

      <div class="input-wrapper">

        <label>{{ $t('port.lang') }}</label>
        <input
          type="text"
          :placeholder="$t('port.lat')"
          v-model="result.lang"
          ref="name"
          :class="{invalid: !!!result.lang && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.lang && hasError"
        >
          {{ $t('port.lang', { type: $t('port.lang')}) }}
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
