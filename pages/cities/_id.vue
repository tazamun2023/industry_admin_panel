<template>
  <data-page
    ref="dataPage"
    set-api="setCategory"
    get-api="getCategory"
    set-image-api="setCategoryImage"
    route-name="categories"
    :name="$t('country.country')"
    gate="category"
    :validation-keys="['name', 'iso', 'phonecode']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      {{ result.title }}
      <lang-input :title="$t('city.name')" :valuesOfLang="result.title" @updateInput="updateInput"></lang-input>
      <!--      <div class="input-wrapper">-->

      <!--        <label>{{ $t('country.name') }}</label>-->
      <!--        <input-->
      <!--          type="text"-->
      <!--          :placeholder="$t('country.name')"-->
      <!--          v-model="result.name"-->
      <!--          ref="name"-->
      <!--          :class="{invalid: !!!result.name && hasError}"-->
      <!--        >-->
      <!--        <span-->
      <!--          class="error"-->
      <!--          v-if="!!!result.title && hasError"-->
      <!--        >-->
      <!--          {{ $t('category.req', {type: $t('index.title')}) }}-->
      <!--        </span>-->
      <!--      </div>-->

      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{ $t('country.country') }}</span>
          <select
            class="border border-smooth text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
            name="" id="">
            <option selected>Choose a country</option>
            <option value="18">Bangladesh</option>
          </select>

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
  name: "categories",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        title:
          { ar: '',en: ''},
          // Add more objects for other languages

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
    LangInput,
    DataPage,
    Dropdown
  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('common', ['allCategories'])
  },
  methods: {

    updateInput(language, value) {
      this.$set(this.result.title, language, value);
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
    categorySelected(data) {
      this.result.parent = data.key
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
