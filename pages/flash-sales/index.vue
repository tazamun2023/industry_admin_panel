<template>
  <list-page
    ref="listPage"
    list-api="getFlashSales"
    delete-api="deleteFlashSale"
    route-name="flash-sales"
    :name="$t('fSale.fSale')"
    :order-options="orderOptions"
    gate="view_flash_sales"
    :addButton="$store.state.admin.isVendor"

    manage_gate="manage_flash_sales"

    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
        <tr class="lite-bold">
          <th>
            <input type="checkbox" @change="checkAll">
          </th>
          <th>{{ $t('index.title') }}</th>
          <th>{{ $t('category.status') }}</th>
          <th>{{ $t('prod.sTime') }}</th>
          <th>{{ $t('prod.eTime') }}</th>
          <th>{{ $t('category.created') }}</th>
          <th>&nbsp;</th>
        </tr>

        <tr v-for="(value, index) in list" :key="index">
          <td>
            <input type="checkbox" :value="value.id" v-model="cbList">
          </td>
          <td>
            <nuxt-link
              class="link"
              :to="`/flash-sales/${value.id}`"
            >
              <h5 class="mx-w-300x">{{ value.title }}</h5>
            </nuxt-link>
          </td>
          <td
            class="status"
            :class="{active: value.status == 1 }"
          >
            <span>{{ getStatus(value.status) }}</span>
          </td>
          <td>{{ value.start_time }}</td>
          <td>{{ value.end_time }}</td>
          <td>{{ value.created }}</td>
          <td>
            <button
            class="border-0"
              v-if="$can('manage_flash_sales') && $store.state.admin.isVendor"
              @click.prevent="$refs.listPage.deleteItem(value.id)"><DeleteButtonIcon/></button>
            <button
            class="border-0"
              v-if="$can('manage_flash_sales') && $store.state.admin.isVendor"
              @click.prevent="$refs.listPage.editItem(value.id)"><EditButtonIcon/></button>

          </td>
        </tr>
    </template>
  </list-page>
</template>

<script>
  import DeleteButtonIcon from "~/components/partials/DeleteButtonIcon";
  import EditButtonIcon from "~/components/partials/EditButtonIcon";
  import ListPage from "~/components/partials/ListPage";
  import util from '~/mixin/util'
  import {mapGetters} from 'vuex'
  import bulkDelete from "~/mixin/bulkDelete";

  export default {
    name: "flash-sale",
    middleware: ['common-middleware', 'auth'],
    data(){
      return {
        orderOptions:{
          created_at: { title: this.$t('category.date') },
          title: {title: this.$t('index.title') },
          status: { title: this.$t('category.status') }
        }
      }
    },
    mixins: [util, bulkDelete],
    components: {
      ListPage,
      DeleteButtonIcon,
      EditButtonIcon
    },
    computed: {
    },
    methods:{
    },
    mounted() {
    }
  }
</script>

<style scoped>
.action_img{
  height:16px !important;
  height:16px !important;
  max-height:16px !important;
  min-width:16px !important;
  max-width:16px !important;
}
</style>
