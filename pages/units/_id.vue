<template>
  <data-page
    v-if="$can('brand', 'create') || $can('brand', 'view')"
    ref="dataPage"
    set-api="setBrand"
    get-api="getBrand"
    empty-store-variable="allBrands"
    route-name="units"
    :name="$t('prod.unit')"
    gate="brand"
    :validation-keys="['title']"
    :result="result"
    @result="result = $event"
  >

    <template v-slot:form="{hasError}">

      <div class="input-wrapper">
        <label>{{ $t('index.title') }}</label>
        <input
          type="text"
          :placeholder="$t('index.title')"
          name="title"
          v-model="result.title"
          ref="title"
          @change="slugChange"
          :class="{invalid: !!!result.title && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.title && hasError"
        >
          {{ $t('category.req', { type: $t('index.title')}) }}
        </span>
      </div>
      <div class="input-wrapper">
        <label>{{ $t('unite.unit_code') }}</label>
        <input
          type="text"
          :placeholder="$t('unit.unit_code')"
          name="title"
          v-model="result.title"
          ref="unit_code"
          @change="slugChange"
          :class="{invalid: !!!result.unit_code && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.unit_code && hasError"
        >
          {{ $t('category.req', { type: $t('unit.unit_code')}) }}
        </span>
      </div>

      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('unit.type')}}</span>
          <select class="border border-smooth text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="" id="">
            <option selected>Choose a unit type</option>
            <option value="demenisions">Demenisions</option>
            <option value="size">Size</option>
            <option value="packages">Packages</option>
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

import Dropdown from "~/components/Dropdown"
import DataPage from "~/components/partials/DataPage"
import util from "~/mixin/util"
import {mapGetters} from 'vuex'

export default {
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        title: '',
        slug: '',
        featured: 2,
        status: 2,
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
  },
  methods: {
    featuredSelected(data) {
      this.result.featured = data.key
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },

  },
  async mounted() {
  }
}
</script>

<style scoped>

</style>
