<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="getUnits"
    delete-api="deleteUnit"
    route-name="units"
    empty-store-variable="allBrands"
    :name="$t('unit.unit')"
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
        <th>{{ $t('global.name') }}</th>
        <th>{{ $t('unit.code') }}</th>
        <th>{{ $t('global.type') }}</th>
        <th>{{ $t('global.status') }}</th>
        <th>{{ $t('global.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td>{{ value.name }}</td>
       <td>{{ value.unit_code }}</td>
        <td>{{ value.unit_type }}</td>
        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <span>{{ getStatus(value.status) }}</span>
        </td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('brand', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0"><delete-button-icon/></button>
          <button
            v-if="$can('brand', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>

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
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

export default {
  name: "units",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: { title: this.$t('index.name') },
        created_at: { title: this.$t('category.date') },
        status: { title: this.$t('category.status') }
      }
    }
  },
  components: {
    LazyImage,
    ListPage,
    EditButtonIcon,
    DeleteButtonIcon
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
