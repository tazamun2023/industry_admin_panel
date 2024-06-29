<template>
  <data-page
    ref="dataPage"
    set-api="setBarcode"
    get-api="getBarcode"
    set-image-api="setCategoryImage"
    route-name="barcodes"
    :name="$t('barcode.barcode')"
    gate="manage_initial_setting"
    manage_gate="manage_initial_setting"
    :validation-keys="['name']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="input-wrapper">

        <label>{{ $t('global.name') }}</label>
        <input
          type="text"
          :placeholder="$t('global.name')"
          v-model="result.name"
          ref="name"
          :class="{invalid: !!!result.name && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.name && hasError"
        >
          {{ $t('global.req', { type: $t('global.name')}) }}
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
    name: "barcodes",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          name: '',
          status: ''
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
