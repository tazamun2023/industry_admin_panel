<template>
  <list-page
    v-if="$can('manage_initial_setting')"
    ref="listPage"
    list-api="rejectReasons"
    delete-api="rejectReasons"
    route-name="rejection-reasons"
    empty-store-variable="rejectReasons"
    gate="manage_initial_setting"
    :title="$t('setting.rejection-reasons')"
    filterType="type"
    manage_gate="manage_initial_setting"
    :order-options="filters.reject_reasons_types.map($item=>{return {id:$item.id,title:$item.name}})"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"


  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>

        <th>{{ $t('rejectReasons.Reason') }}</th>
        <th>{{ $t('rejectReasons.type') }}</th>
        <th>{{ $t('rejectReasons.group') }}</th>
        <th>{{ $t('app.Active') }}</th>
        <!--        <th>{{ $t('category.created') }}</th>-->
        <th> {{ $t('app.Actions') }}</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">

          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td>{{ value.description }}</td>
        <td>{{ value.type_data.name }}</td>
        <td>{{ value.group_name }}</td>


        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <SwitchToggle v-model="value.status"/>
        </td>
        <!--        <td>{{ value.created }}</td>-->
        <td>
          <button
            v-if="$can('manage_shipment_setting')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0">
            <delete-button-icon/>
          </button>
          <button

            v-if="$can('manage_shipment_setting')"

            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0">
            <edit-button-icon/>
          </button>

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
import {mapGetters} from "vuex";

export default {
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {}
  },
  components: {
    LazyImage,
    ListPage,
    EditButtonIcon,
    DeleteButtonIcon
  },
  mixins: [util, bulkDelete],
  computed: {
    ...mapGetters('common', ['filters']),

  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
