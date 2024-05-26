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
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='approved', 'border-b-2  border-primary text-primary': openTab ==='approved' }">
                {{ $t('status.approved') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'ready_to_ship')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='ready_to_ship', 'border-b-2    border-primary text-primary': openTab ==='ready_to_ship' }">
                {{ $t('status.readyToShip') }}
              </a>
            </li>

            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'out_for_delivery')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='out_for_delivery', 'border-b-2    border-primary text-primary': openTab ==='out_for_delivery' }">
                {{ $t('status.outForDelivery') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'delivered')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='delivered', 'border-b-2    border-primary text-primary': openTab ==='delivered' }">
                {{ $t('status.delivered') }}
              </a>
            </li>

            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                 v-on:click.prevent="toggleTabs( 'out_for_delivery')"
                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='dispute', 'border-b-2    border-primary text-primary': openTab ==='dispute' }">
                {{ $t('status.dispute') }}
              </a>
            </li>


            <!--            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">-->
            <!--              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"-->
            <!--                 v-on:click.prevent="toggleTabs( 'rejected')"-->
            <!--                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='rejected', 'border-b-2   border-primary text-primary': openTab ==='rejected' }">-->
            <!--                {{ $t('status.rejected') }}-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">-->
            <!--              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"-->
            <!--                 v-on:click.prevent="toggleTabs( 'cancelled')"-->
            <!--                 v-bind:class="{ 'bg-white border-white border-b': openTab !=='cancelled', 'border-b-2   border-primary text-primary': openTab ==='cancelled' }">-->
            <!--                {{ $t('status.cancelled') }}-->
            <!--              </a>-->
            <!--            </li>-->
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
                <div>
                  <div class="card cursor-pointer my-2 p-4"
                       v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                    <div class="flex gap-4 justify-between">
                      <div class="flex-1   flex gap-4 max-w-[46rem] justify-between">
                        <div v-if="closeable" @click="productTableShow(index)" class="p-2 w-5">
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m19 9-7 7-7-7"/>
                          </svg>
                        </div>
                        <!--                        <div class="flex-none p-2 w-5">-->
                        <!--                          <input type="checkbox" @change="setSelectedOrder(order, $event.target.checked)">-->
                        <!--                        </div>-->
                        <CardTab class="flex-1 " :order="order"></CardTab>

                      </div>

                      <div class="flex-initial w-96  justify-self-start flex gap-4">
                        <div>
                          <p>{{ $t('order.total') }}:</p>


                          <price-with-curency-format :price="order?.sub_total"></price-with-curency-format>


                        </div>
                        <div v-if="order?.status!='pending'">
                          <button @click="rejectModalShow(order)" v-if="$can('fulfil_orders')"
                                  class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">
                            {{ $t('order.rejectOrder') }}
                          </button>
                          <button @click="approvedModalShow(order)" v-if="$can('fulfil_orders')"
                                  class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">
                            {{ $t('order.approveOrder') }}
                          </button>
                        </div>
                        <div
                          v-else-if="['approved','ready_to_ship','out_for_delivery'].includes(order?.status)">
                          <button @click="changeStatusModalShow(order)" v-if="$can('fulfil_orders')"
                                  class="border-2 mt-1 border-info text-info uppercase font-bold p-2 rounded leading-3">
                          <span>
                            {{ $t('changeStatus.from_status.' + order?.status) }}
                          </span>

                          </button>
                        </div>
                        <div>
                          <button @click="$router.push('orders/'+order.order_id)"
                                  class="border-2 font-bold mt-1 border-primary p-2 uppercase  rounded text-primary hover:text-primary leading-3">
                            {{ $t('order.ViewOrder') }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class=" flex flex-col">
                      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div class="overflow-hidden">
                            <order-items :show_taxes="false" :order="order"
                                         v-if="!(closeable && index !== indexTabel)"></order-items>
                            <!--                            <TablePending v-if="!(closeable && index !== indexTabel)">-->
                            <!--                              <tr-sub-items :subItems="order.sub_order_items"/>-->
                            <!--                            </TablePending>-->
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
        <OrderApprovedModal v-if="$can('fulfil_orders')" :saving="saveSata" :selectedOrders="selectedOrders"
                            :show-modal="approvedModal" @save="saveRejectProduct"
                            @approveOrder="approveOrderSave" :reasonsRejection="reasonsRejection.data"
                            @close="handleModalClose"/>

        <OrderReject v-if="rejectModal && $can('order_cancellation')" @close="rejectModalClose"
                     :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject"/>

        <OrderChangeStatus v-if="changeStatusModal && $can('order_cancellation')" @close="changeStatusModalClose"
                           :saveSata="saveSata" :selectedOrders="selectedOrders" @save="saveChangeStatusModal"/>


        <!--        <custome-modal size="lg" :show-modal="showModal"></custome-modal>-->


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
import OrderChangeStatus from "../../components/OrderChangeStatus.vue";
import OrderReject from "../../components/OrderReject.vue";
import OrderApprovedModal from "../../components/OrderApprovedModal.vue";
import OrderItems from "./component/OrderItems.vue";
import CustomeModal from "../../components/CustomeModal.vue";

export default {
  components: {
    CustomeModal,
    OrderItems,
    OrderApprovedModal,
    OrderReject,
    OrderChangeStatus,
    PriceWithCurencyFormat,
    PaymentMethod, TrSubItems, CardTab, Pagination, FilterData, TablePending, Spinner, LazyImage
  },
  data() {
    return {
      openTab: 'all',
      loading: true,
      approvedModal: false,
      saveSata: false,
      showModal: false,
      selectedOrders: [],
      rejectModal: false,
      changeStatusModal: false,
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
    ...mapGetters('order', ['reasonsRejection']),
    closeable() {
      return !['all', 'pending'].includes(this.openTab)
    },
  },
  middleware: ['common-middleware', 'auth'],
  mixins: [util, routeParamHelper],
  methods: {
    ...mapActions('order', ['getOrder', 'getReasonsRejection', 'subOrderReject', 'subOrderChangeStatus', 'changeStatus', 'approveOrder', 'getDataPending', 'getDataOrderApproved', 'getDataOrderRejected']),
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
    changeStatusModalShow(order) {

      this.selectedOrders = [];
      this.selectedOrders.push(order);
      this.changeStatusModal = !this.changeStatusModal

    },
    async saveReject(data) {
      this.saveSata = true
      const response = await this.subOrderReject({
        payload: {
          status: data.status,
          order_id: data.order_id,
          reject_reason_id: data.reject_reasons
        }
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.orders.data[index] = response;
      }
      // this.fetchingData()
      this.saveSata = false
      this.rejectModalClose();
    },
    async saveChangeStatusModal(data) {
      this.saveSata = true
      const response = await this.subOrderChangeStatus({
        payload: {
          status: data.status,
          receipt_files: data.files,
          order_id: data.order_id,
          reject_reason_id: data.reject_reasons
        }
      })
      this.saveSata = false
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.orders.data[index] = response;
      }
      // this.fetchingData()
      this.changeStatusModalClose();
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
      this.saveSata = true
      const response = await this.approveOrder({
        payload: data
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.data.order_id);
      if (index !== -1) {
        this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], {status: response.data.status}));
      }
      this.saveSata = false
      this.handleModalClose();
    },
    handleModalClose() {
      this.selectedOrders = [];
      this.approvedModal = false;
      this.saveSata = false;
    },
    rejectModalClose() {
      this.selectedOrders = [];
      this.rejectModal = false;
    },
    changeStatusModalClose() {
      this.selectedOrders = [];
      this.changeStatusModal = false;
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
<style>
.tooltip {
  position: relative;
}

.tooltip .tooltip-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.tooltip:hover .tooltip-content {
  display: block;
}
</style>

