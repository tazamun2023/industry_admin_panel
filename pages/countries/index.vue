<template>
  <list-page
    v-if="$can('manage_shipment_setting')"
    ref="listPage"
    list-api="getCountriesData"
    route-name="countries"
    empty-store-variable="allBrands"
    gate="manage_shipment_setting"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">

        <th>{{ $t('country.iso') }}</th>
        <th>{{ $t('country.iso3') }}</th>
        <th>{{ $t('global.name') }}</th>
        <th>{{ $t('country.phonecode') }}</th>
        <th>{{ $t('country.currency_code') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td>{{ value.iso }}</td>
        <td>{{ value.iso3 }}</td>

      <td v-if="langCode === 'en'">{{ value.name.en }}</td>
        <td v-else>{{ value.name.ar }}</td>

        <td>+{{ value.phonecode }}</td>
        <td>{{ value.currency_code }}</td>
      </tr>
    </template>
  </list-page>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage";
import bulkDelete from "~/mixin/bulkDelete";
import {mapGetters} from "vuex";

export default {
  name: "countries",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: { title: this.$t('global.name') },
      }
    }
  },
  components: {
    LazyImage,
    ListPage
  },
  mixins: [util, bulkDelete],
  computed: {
    ...mapGetters('language', ['langCode']),

  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
