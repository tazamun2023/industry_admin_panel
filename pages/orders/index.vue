<template>
  <check-validity :gate="'view_orders'">
    <div :class="{ loading: loading }">
      <div class="orders">
        <div class="card p-4">
          <h4 class="font-bold">{{ $t('order.allOrders') }}</h4>
          <ul class="flex mb-0 list-none flex-wrap pt-3 lg:w-/4 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                 v-on:click.prevent="toggleTabs( 'all')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='all', 'border-b-2  border-primary text-primary': openTab ==='all' }">
                {{ $t('order.allOrders') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'pending')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='pending', 'border-b-2  border-primary text-primary': openTab ==='pending' }">
                {{ $t('order.pendingApproval') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'pending_approved')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='pending_approved', 'border-b-2  border-primary text-primary': openTab ==='pending_approved' }">
                {{ $t('order.pendingCustomerApproval') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'approved')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='approved', 'border-b-2    border-primary text-primary': openTab ==='approved' }">
                {{ $t('order.readyForPickup') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'rejected')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='rejected', 'border-b-2   border-primary text-primary': openTab ==='rejected' }">
                {{ $t('order.rejected') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div>
                <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs( openTab)" :tap="openTab"
                            :invoice_status="true"/>
                <div class="text-center flex justify-center">
                  <spinner :radius="100" v-if="loading"/>
                </div>
                <div v-if="openTab =='approved' || openTab =='rejected' ">
                  <div @click="productTableShow(index)"
                       class="card cursor-pointer my-2 p-4"
                       v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                    <CardTab :order="order"/>
                    <TablePending v-if="index === indexTabel" :action="false">
                      <tr-sub-items :subItems="order.sub_order_items"/>
                    </TablePending>

                  </div>
                </div>
                <div v-else>
                  <div class="card my-2 p-4" v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                    <div class="flex gap-4 justify-between">
                      <div class="flex-none p-2 w-5">
                        <input type="checkbox" @change="setSelectedOrder(order, $event.target.checked)">
                      </div>
                      <div class="flex-1   flex gap-4 max-w-[40rem] justify-between">

                        <div>
                          <p>{{ $t('order.orderId') }}: </p>
                          <p class="font-bold">{{ order?.order_id }}</p>
                        </div>
                        <div>
                          <p>{{ $t('order.orderPlaced') }}:</p>
                          <p class="font-bold">{{ order?.order_placed }}</p>
                        </div>
                        <div>
                          <p>{{ $t('orderDetails.type') }}</p>
                          <p class="">
                            {{ order?.type?.name }}
                          </p>
                        </div>
                        <div>
                          <p>{{ $t('order.paymentMethod') }}:</p>
                          <payment-method :payment_method="order?.payment_method"></payment-method>

                        </div>
                        <div>
                          <p>{{ $t('order.payment') }}:</p>
                          <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                            {{ order.payment_status_data.name }}

                          </span>
                          </p>
                        </div>
                        <div>
                          <p>{{ $t('order.status') }}:</p>
                          <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                            {{ order?.status_data.name }}
                          </span></p>
                        </div>
                      </div>
                      <div class="flex-initial w-96  justify-self-start flex gap-4">
                        <div>
                          <p>{{ $t('order.total') }}:</p>

                          <price-with-curency-format :price="order?.sub_total"></price-with-curency-format>
                        </div>
                        <div>
                          <button @click="rejectModalShow(order)" v-if="$can('fulfil_orders')"
                                  class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">
                            {{ $t('order.rejectOrder') }}
                          </button>
                        </div>
                        <div>
                          <button @click="approvedModalShow(order)" v-if="$can('fulfil_orders')"
                                  class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">
                            {{ $t('order.approveOrder') }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class=" flex flex-col">
                      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div class="overflow-hidden">
                            <TablePending>
                              <tr-sub-items :subItems="order.sub_order_items"/>
                            </TablePending>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center mb-15" v-if="!loading && orders.data?.length > 0">
                  <h5 class="mt-20 mt-sm-15"></h5>
                  <pagination :total-page="orders?.last_page"/>
                </div>
                <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }}</div>
              </div>
            </div>
          </div>
        </div>
        <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct"
                            @approveOrder="approveOrderSave" :reasonsRejection="reasonsRejection.data"
                            @close="handleModalClose"/>
        <OrderReject v-if="rejectModal && $can('order_cancellation')" @close="rejectModalClose"
                     :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject"/>
      </div>
    </div>
  </check-validity>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import LazyImage from "../../components/LazyImage.vue";
import Spinner from "../../components/Spinner.vue";
import TablePending from "./component/TablePending.vue";
import FilterData from "./component/FilterData.vue";
import Pagination from "../../components/partials/Pagination.vue";
import CardTab from "./component/CardTab.vue";
import TrSubItems from "./component/TrSubItem.vue";
import PaymentMethod from "../../components/paymentMethod.vue";
import PriceWithCurencyFormat from "../../components/priceWithCurencyFormat.vue";
import util from '~/mixin/util'
import routeParamHelper from "~/mixin/routeParamHelper"

export default {
  components: {
    PriceWithCurencyFormat,
    PaymentMethod, TrSubItems, CardTab, Pagination, FilterData, TablePending, Spinner, LazyImage
  },
  data() {
    return {
      openTab: 'all',
      loading: true,
      approvedModal: false,
      selectedOrders: [],
      rejectModal: false,
      indexTabel: null,
      status: 'pending',
      RejectionOrder: "",
      orders: [],
      productTable: {
        1: false,
        2: false
      }
    }
  },
  computed: {
    ...mapGetters('order', ['reasonsRejection'])
  },
  middleware: ['common-middleware', 'auth'],
  mixins: [util, routeParamHelper],
  methods: {
    ...mapActions('order', ['getOrder', 'getReasonsRejection', 'subOrderReject', 'changeStatus', 'approveOrder', 'getDataPending', 'getDataOrderApproved', 'getDataOrderRejected']),
    ...mapActions('common', ['deleteData', 'getRequest', 'emptyAllList']),
    async filterUpdate(result) {
      console.log('filter update')
      this.$router.push({
        query: {
          ...this.$route.query,
          ...result
        }
      })
    },
    async toggleTabs(status) {
      this.status = status
      this.openTab = status
      // await this.fetchingData({tap: status,})
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,

          tap: status,
        }
      })

    },
    productTableShow(index) {
      this.productTable[index] = !this.productTable[index];
      if (this.indexTabel === index) {
        this.indexTabel = null
      } else {
        this.indexTabel = index;
      }
    },
    approvedModalShow(order) {
      this.$store.commit('order/EMPTY_ORDER_SELECTED');
      if (this.selectedOrders.length > 0) {
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED', order);
      } else {
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED', order);
      }
      this.approvedModal = !this.approvedModal
    },
    rejectModalShow(order) {
      if (this.selectedOrders.length > 0) {
        this.rejectModal = !this.rejectModal
      } else {
        this.selectedOrders.push(order);
        this.rejectModal = !this.rejectModal
      }
    },
    async saveReject(data) {
      const response = await this.subOrderReject({
        payload: {
          status: data.status,
          order_id: data.order_id,
          reject_reason_id: data.reject_reasons
        }
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.orders.data[index].status = response.status;
      }
      // this.fetchingData()
      this.rejectModalClose();
    },
    saveRejectProduct(data) {
      this.loading = true;

      this.changeStatus({
        payload: {
          status: data.status,
          product_id: data.order.product.id,
          reject_reasons: data.reject_reasons
        }
      })
      this.approvedModal();
      this.loading = false;
    },
    async approveOrderSave(data) {
      const response = await this.approveOrder({
        payload: data
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.data.order_id);
      if (index !== -1) {
        this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], {status: response.data.status}));
      }
      this.handleModalClose();
    },
    handleModalClose() {
      this.selectedOrders = [];
      this.approvedModal = false;
    },
    rejectModalClose() {
      this.selectedOrders = [];
      this.rejectModal = false;
    },
    setSelectedOrder(order, checked) {
      if (checked) {
        if (!this.selectedOrders.includes(order)) {
          this.selectedOrders.push(order);
        }
      } else {
        const index = this.selectedOrders.findIndex(selectedOrder => selectedOrder.id === order.id);
        if (index !== -1) {
          this.selectedOrders.splice(index, 1);
        }
      }

    },

    async fetchingData(data = {}) {
      try {
        this.loading = true
        this.settingRouteParam()
        this.orders = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
            ...data,
            order_status: this.openTab === 'all' ? this.$route.query.order_status : [],

            // ...this.listParams,
            ...{time_zone: this.timeZone}
          },
          api: "subOrder"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
  },
  mounted() {
    this.openTab = this.$route.query.tap ?? 'all'
    if (this.reasonsRejection.length == 0)
      this.getReasonsRejection()
    this.fetchingData()
  }

}
</script>
