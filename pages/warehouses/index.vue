<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="getWareHouses"
    delete-api="deleteWareHouses"
    route-name="warehouses"
    empty-store-variable="allBrands"
    :name="$t('warehouses.unit')"
    gate="brand"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>
        <th>{{ $t('index.name') }}</th>
        <th>{{ $t('wirehouse.manager_number') }}</th>
        <th>{{ $t('wirehouse.nearest_air_port') }}</th>
        <th>{{ $t('wirehouse.nearest_sea_port') }}</th>
        <th>{{ $t('wirehouse.is_open_friday') }}</th>
        <th>{{ $t('wirehouse.is_open_saturday') }}</th>
        <th>{{ $t('wirehouse.lat') }}</th>
        <th>{{ $t('wirehouse.lang') }}</th>
        <th>{{ $t('wirehouse.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td>{{ value.name }}</td>
       <td>{{ value.manager_number }}</td>
        <td>{{ value.nearest_air_port }}</td>
        <td>{{ value.nearest_sea_port }}</td>
        <td>{{$t('app.is_open_'+ value.is_open_friday )}}</td>
        <td>{{$t('app.is_open_'+ value.is_open_saturday )}}</td>
        <td>{{ value.lat }}</td>
        <td>{{ value.lang }}</td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('brand', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="lite-btn">{{ $t('category.edit') }}</button>
          <button
            v-if="$can('brand', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="delete-btn lite-btn">{{ $t('category.delete') }}</button>
        </td>
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
  name: "warehouses",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: { title: this.$t('index.name') },
        created_at: { title: this.$t('category.date') },
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
