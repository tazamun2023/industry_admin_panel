<template>
  <check-validity :gate="'view_orders'">
    <div :class="{ loading: loading }">
      <div class="orders">
        <div class="card p-4">
          <h4 class="font-bold">{{ $t('order.allOrders') }}</h4>
          <ul class="flex mb-0 list-none flex-wrap pt-3 w-2/4 pb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                v-on:click.prevent="toggleTabs(1, 'all')"
                v-bind:class="{ 'bg-white border-white border-b': openTab !== 1, 'border-b-2  border-primary text-primary': openTab === 1 }">
                {{ $t('order.allOrders') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                v-on:click.prevent="toggleTabs(2, 'pending')"
                v-bind:class="{ 'bg-white border-white border-b': openTab !== 2, 'border-b-2  border-primary text-primary': openTab === 2 }">
                {{ $t('order.pendingApproval') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                v-on:click.prevent="toggleTabs(3, 'approved')"
                v-bind:class="{ 'bg-white border-white border-b': openTab !== 3, 'border-b-2    border-primary text-primary': openTab === 3 }">
                {{ $t('order.readyForPickup') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
              <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                v-on:click.prevent="toggleTabs(4, 'rejected')"
                v-bind:class="{ 'bg-white border-white border-b': openTab !== 4, 'border-b-2   border-primary text-primary': openTab === 4 }">
                {{ $t('order.rejected') }}
              </a>
            </li>
          </ul>
        </div>

        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">

          <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />
                <div class="text-center flex justify-center">
                  <spinner :radius="100" v-if="loading" />
                </div>
                <div class="card my-2 p-4" v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4">
                      <div class="p-2">
                        <input type="checkbox" @change="setSelectedOrder(order, $event.target.checked)">
                      </div>
                      <div>
                        <p>{{ $t('order.orderId') }}: </p>
                        <p class="font-bold">{{ order?.order_id }}</p>
                      </div>
                      <div>
                        <p>{{ $t('order.orderPlaced') }}:</p>
                        <p class="font-bold">{{ order?.order_placed }}</p>
                      </div>
                      <div>
                        <p>{{ $t('order.paymentMethod') }}:</p>
                        <p class="font-bold">
                          {{ $t(`paymentMethod.${order?.payment_method}`) }}
                        </p>
                      </div>
                      <div>
                        <p>{{ $t('order.payment') }}:</p>
                        <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                            {{ $t(`status.${order?.payment_status}`) }}

                          </span>
                        </p>
                      </div>
                      <div>
                        <p>{{ $t('order.status') }}:</p>
                        <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                            {{ $t(`status.${order?.status}`) }}
                          </span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>{{ $t('order.total') }}:</p>
                        <p><strong>
                            {{ order?.total }}
                          </strong> <span>{{ $t('app.SAR') }}</span></p>
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

                  <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">

                          <TablePending>
                            <tbody>
                              <tr class=" " v-for="(subItem, index) in order.sub_order_items" :key="index">
                                <td class="whitespace-nowrap p-2 font-medium">{{ index + 1 }}</td>
                                <td class="whitespace-nowrap p-2">
                                  <div class="flex gap-4">
                                    <LazyImage :data-src="subItem.product.image" :title="subItem.product.title"
                                      :alt="subItem.product.title" class="w-10 h-10" />
                                    <div>
                                      <a href="">{{ subItem.product.title.slice(0, 30) }}</a>
                                      <p>{{ $t('vendor.sku') }}: {{ subItem.product.sku }}</p>
                                    </div>
                                  </div>

                                </td>
                                <td class="whitespace-nowrap p-2">{{ subItem?.quantity }}</td>
                                <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ subItem?.price }} /
                                  {{ $t('brand.price') }}
                                </td>
                                <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ subItem?.total_price }}</td>
                                <td class="whitespace-nowrap p-2">
                                  <select class="p-3 border border-smooth rounded" name="" id="">
                                    <option value="">{{ $t('order.available') }}</option>
                                    <option value="">{{ $t('order.noAvailable') }}</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </TablePending>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <!-- <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page" :page="order?.current_page"
                  v-if="!loading && orders.data?.length > 0" /> -->
                <div class="flex justify-center mb-15" v-if="!loading && orders.data?.length > 0">
                  <h5 class="mt-20 mt-sm-15"></h5>
                  <pagination :total-page="orders?.last_page" />
                </div>
                <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>
              </div>
              <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />
                <div class="text-center flex justify-center">
                  <spinner :radius="100" v-if="loading" />
                </div>
                <div class="card my-2 p-4" v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                  <div class="flex gap-4 justify-between">
                    <div class="flex gap-4">
                      <div class="p-2">
                        <input type="checkbox" @change="setSelectedOrder(order, $event.target.checked)">
                      </div>
                      <div>
                        <p>{{ $t('order.orderId') }}: </p>
                        <p class="font-bold">{{ order?.order_id }}</p>
                      </div>
                      <div>
                        <p>{{ $t('order.orderPlaced') }}:</p>
                        <p class="font-bold">{{ order?.order_placed }}</p>
                      </div>
                      <div>
                        <p>{{ $t('order.paymentMethod') }}:</p>
                        <p class="font-bold">
                          {{ $t(`paymentMethod.${order?.payment_method}`) }}
                        </p>
                      </div>
                      <div>
                        <p>{{ $t('order.payment') }}:</p>
                        <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                            {{ $t(`status.${order?.payment_status}`) }}</span>
                        </p>
                      </div>
                      <div>
                        <p>{{ $t('order.status') }}:</p>
                        <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                            {{ $t(`status.${order?.status}`) }}
                          </span></p>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p>{{ $t('order.total') }}:</p>
                        <p><strong>
                            {{ order?.total }}
                          </strong> <span>{{ $t('app.SAR') }}</span></p>
                      </div>
                      <div>
                        <button @click="rejectModalShow(order)"
                          class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">
                          {{ $t('order.rejectOrder') }}
                        </button>
                      </div>
                      <div>
                        <button @click="approvedModalShow(order)"
                          class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">
                          {{ $t('order.approveOrder') }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <TablePending>
                    <tbody>
                      <tr class=" " v-for="(subItem, index) in order.sub_order_items" :key="index">
                        <td class="whitespace-nowrap p-2 font-medium">{{ index + 1 }}</td>
                        <td class="whitespace-nowrap p-2">
                          <div class="flex gap-4">
                            <LazyImage :data-src="subItem.product.image" :title="subItem.product.title"
                              :alt="subItem.product.title" class="w-10 h-10" />
                            <div>
                              <a href="">{{ subItem.product.title.slice(0, 30) }}</a>
                              <p>{{ $t('vendor.sku') }}: {{ subItem.product.sku }}</p>
                            </div>
                          </div>

                        </td>
                        <td class="whitespace-nowrap p-2">{{ subItem?.quantity }}</td>
                        <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ subItem?.price }} / {{
                          $t('brand.price') }}</td>
                        <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ subItem?.total_price }}</td>
                        <td class="whitespace-nowrap p-2">
                          <select class="p-3 border border-smooth rounded" name="" id="">
                            <option value="">{{ $t('order.available') }}</option>
                            <option value="">{{ $t('order.noAvailable') }}</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </TablePending>

                </div>
                <!-- <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page" :page="order?.current_page"
                  v-if="!loading && orders.data?.length > 0" /> -->
                <div class="flex justify-center mb-15" v-if="!loading && orders.data?.length > 0">
                  <h5 class="mt-20 mt-sm-15"></h5>
                  <pagination :total-page="orders?.last_page" />
                </div>
                <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>
              </div>
              <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab"
                  :invoice_status="true" />
                <div class="text-center flex justify-center">
                  <spinner :radius="100" v-if="loading" />
                </div>
                <div @click="productTableShow(index)" class="card cursor-pointer my-2 p-4"
                  v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                  <CardTab :order="order" />
                  <TablePending v-if="index === indexTabel" :action="false">
                    <tr-sub-items :subItems="order.sub_order_items" />
                  </TablePending>

                </div>
                <div class="flex justify-center mb-15" v-if="!loading && orders.data?.length > 0">
                  <h5 class="mt-20 mt-sm-15"></h5>
                  <pagination :total-page="orders?.last_page" />
                </div>
                <!-- <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page"
                          :page="order?.current_page" v-if="!loading && orders.data?.length > 0"
              /> -->
                <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>

              </div>
              <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab"
                  :invoice_status="true" />
                <div class="text-center flex justify-center">
                  <spinner :radius="100" v-if="loading" />
                </div>
                <div @click="productTableShow(index)" class="card cursor-pointer my-2 p-4"
                  v-for="(order, index) in orders?.data" :key="index" v-if="!loading">
                  <CardTab :order="order" />

                  <TablePending v-if="index === indexTabel" :action="false">
                    <tr-sub-items :subItems="order.sub_order_items" />
                  </TablePending>

                </div>
                <div class="flex justify-center mb-15" v-if="!loading && orders.data?.length > 0">
                  <pagination :total-page="orders?.last_page" />
                </div>
                <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>
              </div>
            </div>
          </div>
        </div>

        <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct"
          @approveOrder="approveOrderSave" :reasonsRejection="reasonsRejection.data" @close="handleModalClose" />
        <OrderReject v-if="rejectModal && $can('order_cancellation')" @close="rejectModalClose"
          :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject" />
      </div>
    </div>
  </check-validity>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LazyImage from "../../components/LazyImage.vue";
import Spinner from "../../components/Spinner.vue";
import TablePending from "./component/TablePending.vue";
import FilterData from "./component/FilterData.vue";
import Pagination from "../../components/partials/Pagination.vue";
import CardTab from "./component/CardTab.vue";
import TrSubItems from "./component/TrSubItem.vue";

export default {
  components: { TrSubItems, CardTab, Pagination, FilterData, TablePending, Spinner, LazyImage },
  data() {
    return {
      openTab: 1,
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
  methods: {
    ...mapActions('order', ['getOrder', 'getReasonsRejection', 'subOrderReject', 'changeStatus', 'approveOrder', 'getDataPending', 'getDataOrderApproved', 'getDataOrderRejected']),
    ...mapActions('common', ['deleteData', 'getRequest', 'emptyAllList']),
    async filterUpdate(result) {
      try {
        this.loading = true
        this.orders = await this.getRequest({
          params: {
            ...result,
          },
          api: "subOrder"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
      // this.fetchingData();
    },
    async toggleTabs(tabNumber, status) {
      let search = {
        tap: status,
      }
      try {
        this.loading = true
        this.orders = await this.getRequest({
          params: {
            ...this.param,
            ...search
          },
          api: "subOrder"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }

      this.status = status
      this.openTab = tabNumber
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
        this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], { status: response.data.status }));
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
    async fetchingData() {
      try {
        this.loading = true
        this.orders = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
            // ...this.listParams,
            ...{ time_zone: this.timeZone }
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
    this.getReasonsRejection()
    this.fetchingData()
  }

}
</script>
