<template>
  <list-page
    v-if="$can('manage_shipment_setting')"
    ref="listPage"
    list-api="getPorts"
    delete-api="deletePort"
    route-name="ports"
    empty-store-variable="allBrands"
    :name="$t('port.port')"
    gate="manage_shipment_setting"

    manage_gate="manage_shipment_setting"

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
        <th>{{ $t('global.type') }}</th>
        <th>{{ $t('port.country') }}</th>
        <th>{{ $t('port.city') }}</th>
        <th>{{ $t('global.lat') }}</th>
        <th>{{ $t('global.lang') }}</th>
        <th>{{ $t('global.status') }}</th>
        <th>{{ $t('global.create_by') }}</th>
        <th>{{ $t('global.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td>{{ value.name }}</td>
        <td>{{ value.type }}</td>
        <td>{{ value.country_name }}</td>
        <td>{{ value.city_name }}</td>
        <td>{{ value.lat }}</td>
        <td>{{ value.lang }}</td>
        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <span>{{ getStatus(value.status) }}</span>
        </td>
        <td>{{ value.created_by }}</td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('manage_shipment_setting')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0"><delete-button-icon/></button>
          <button
            v-if="$can('manage_shipment_setting')"

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
  name: "ports",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: { title: this.$t('index.title') },
        created_at: { title: this.$t('category.date') },
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
