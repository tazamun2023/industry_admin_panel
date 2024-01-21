<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="getCountriesData"
    route-name="countries"
    empty-store-variable="allBrands"
    gate="brand"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
<!--        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>-->
        <th>{{ $t('country.iso') }}</th>
        <th>{{ $t('country.iso3') }}</th>
        <th>{{ $t('country.name') }}</th>
        <th>{{ $t('country.phonecode') }}</th>
        <th>{{ $t('country.currency_code') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
<!--        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>-->

        <td>{{ value.iso }}</td>
        <td>{{ value.iso3 }}</td>
        <td>{{ value.name }}</td>
        <td>+{{ value.phonecode }}</td>
        <td>{{ value.currency_code }}</td>
<!--        <td>-->
<!--          <button-->
<!--            v-if="$can('brand', 'edit')"-->
<!--            @click.prevent="$refs.listPage.editItem(value.id)" class="lite-btn">{{ $t('category.edit') }}</button>-->
<!--          <button-->
<!--            v-if="$can('brand', 'delete')"-->
<!--            @click.prevent="$refs.listPage.deleteItem(value.id)" class="delete-btn lite-btn">{{ $t('category.delete') }}</button>-->
<!--        </td>    <td>-->
<!--          <button-->
<!--            v-if="$can('brand', 'edit')"-->
<!--            @click.prevent="$refs.listPage.editItem(value.id)" class="lite-btn">{{ $t('category.edit') }}</button>-->
<!--          <button-->
<!--            v-if="$can('brand', 'delete')"-->
<!--            @click.prevent="$refs.listPage.deleteItem(value.id)" class="delete-btn lite-btn">{{ $t('category.delete') }}</button>-->
<!--        </td>-->
      </tr>
    </template>
  </list-page>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage";
import bulkDelete from "~/mixin/bulkDelete";

export default {
  name: "countries",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: { title: this.$t('index.title') },
      }
    }
  },
  components: {
    LazyImage,
    ListPage
  },
  mixins: [util, bulkDelete],
  computed: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
