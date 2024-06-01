<template>
  <list-page
    v-if="$can('manage_shipment_setting')"
    ref="listPage"
    list-api="rejectReasons"
    delete-api="rejectReasons"
    route-name="ejection-reasons"
    empty-store-variable="rejectReasons"
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
        <td>{{ value.name }}</td>


        <td
          class="status"
          :class="{active: value.status == 1 }"
        >            <SwitchToggle v-model="value.status"/>
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
    return {
      orderOptions: {
        Products: {
          "id": "Products",
          "title": "Products"
        },
        Brands: {
          "id": "Brands",
          "title": "Brands"
        },
        RFQs: {
          "id": "RFQs",
          "title": "RFQs"
        },
        RejectOrders: {
          "id": "RejectOrders",
          "title": "RejectOrders"
        },
        UnavailableOrderItems: {
          "id": "UnavailableOrderItems",
          "title": "UnavailableOrderItems"
        },
        CancelOrders: {
          "id": "CancelOrders",
          "title": "CancelOrders"
        },
        BankPayment: {
          "id": "BankPayment",
          "title": "filters.rejectReasons.BankPayment"
        }

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
  computed: {
    ...mapGetters('common', ['reject_reasons_types']),

  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
