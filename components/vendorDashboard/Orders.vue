<template>
  <div class="p-4 card">
    <div class="flex justify-between">
      <h4 class="text-[20px] font-medium">Orders</h4>

    </div>
    <div class="my-4 scroolbar rounded-[12px] overflow-x-scroll lg:overflow-hidden border border-cardb">
      <list-page
        ref="listPage"
        :list-api="`dashboard`"
        route-name="dashboard"
        empty-store-variable="dashboard"
        :name="$t('brand.dashboard')"
        gate="view_brands"
        manage_gate="manage_brands"
        @list="itemList = $event"
        :addButton="false"
        :filter="false"
      >
        <template v-slot:table="{list}">
          <tr>
            <th class="text-[14px] capitalize border-b border-cardb">Order ID</th>
            <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Product <img
              class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
            <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Qty  <img
              class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
            <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Date <img
              class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
            <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Revenue <img
              class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
            <th class="text-[14px] capitalize border-b border-cardb"><span
              class="flex gap-2 items-center">Net  Profit <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span>
            </th>
            <th class="text-[14px] capitalize border-b border-cardb"><span class="flex gap-2 items-center">Status <img
              class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
            <!--          <th></th>-->
          </tr>

          <tr v-for="(order, index) in list" :key="index">
            <td class="text-[13px] border-b border-cardb capitalize">
              #{{ order.order_id }}
            </td>
            <td class="text-[13px] border-b border-cardb capitalize">
              <span class="text-semibold">{{ order?.product?.name }}</span>
            </td>
            <td class="text-[13px] border-b border-cardb capitalize">
              {{ order.total_qty }}
            </td>
            <td class="text-[13px] border-b border-cardb capitalize">
              {{  order.order_date }}
            </td>
            <td class="text-[13px]  border-b border-cardb capitalize">
              <price-format :price="Number(order.total_revenue)" />
            </td>
            <td class="text-[13px] border-b border-cardb capitalize">
              <price-format :price="Number(order.total_net_profit)" />
            </td>

            <td class="text-[13px] border-b border-cardb capitalize">
              <span class="text-primary"> {{ order.status }}</span>
            </td>
            <!--          <td class="border-b border-cardb">-->
            <!--            <div class="flex gap-4 items-center">-->
            <!--              <delete-button-icon/>-->
            <!--              <edit-button-icon/>-->
            <!--            </div>-->
            <!--          </td>-->

          </tr>
        </template>
      </list-page>
    </div>

  </div>
</template>

<script>
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import GlobalPagination from "../../components/GlobalPagination.vue";
import PriceFormat from "../partials/PriceFormat.vue";
import ListPage from "../partials/ListPage.vue";

export default {
  name: 'OrdersData',
  props: ['orders'],
  components: {
    ListPage,
    PriceFormat,
    DeleteButtonIcon,
    EditButtonIcon,
    GlobalPagination
  }
}
</script>
<style scoped>
  .card >>> .table-wrapper{
    margin:0px !important;
  }
</style>
