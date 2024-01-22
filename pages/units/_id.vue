<template>
  <data-page
    ref="dataPage"
    set-api="setUnit"
    get-api="getUnit"
    empty-store-variable="allBrands"
    route-name="units"
    :name="$t('prod.unit')"
    gate="brand"
    :validation-keys="['name.ar','name.en', 'unit_type']"
    :result="result"
    @result="result = $event"
  >

    <template v-slot:form="{hasError}">

      <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="result.name"
                  @updateInput="updateInput"></lang-input>

      <div class="input-wrapper">
         <span class="mr-15">{{$t('global.type')}}</span>
          <v-select
            :dir="$t('app.dir')"
            v-model="result.unit_type"
            :options="['demenisions','weight', 'packages']"
            :placeholder="$t('unit.type')"
            class="custom-select"
          ></v-select>

        <span
          class="error"
          v-if="!!!result.unit_type && hasError"
        >
          {{ $t('global.req', { type: $t('global.type')}) }}
        </span>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('unite.unit_code') }}</label>
        <input
          type="text"
          :placeholder="$t('unit.unit_code')"
          name="title"
          v-model="result.unit_code"
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
  name: "units",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        name: {'ar': '', 'en': ''},
        unit_type: '',
        unit_code: '',
        status: 1
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
