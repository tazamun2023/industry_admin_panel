<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="getBrands"
    delete-api="deleteBrand"
    route-name="brands"
    empty-store-variable="allBrands"
    :name="$t('port.port')"
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
        <th>{{ $t('port.port') }}</th>
        <th>{{ $t('port.type  ') }}</th>
        <th>{{ $t('port.country') }}</th>
        <th>{{ $t('port.city') }}</th>
        <th>{{ $t('port.lat') }}</th>
        <th>{{ $t('port.lang') }}</th>
        <th>{{ $t('country.create_by') }}</th>
        <th>{{ $t('country.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td>Port name</td>
        <td>Sea, Air</td>
        <td>Bangladesh</td>
        <td>Dhaka</td>
        <td>Lat</td>
        <td>English</td>
        <td>Tazamun</td>
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
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        title: { title: this.$t('index.title') },
        featured: { title: this.$t('category.featured') },
        created_at: { title: this.$t('category.date') },
        status: { title: this.$t('category.status') }
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
