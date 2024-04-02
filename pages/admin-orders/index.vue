<template>
  
  <check-validity :gate="'view_main_orders'" class="orders card p-4">
    <div class="p-4">
      <h3 class="uppercase">{{ $t('error.orders') }}</h3>
      <ul class="flex list-none bg-smooth shadow flex-wrap rounded-xl p-1  w-2/5  my-3 flex-row">
        <li class="-mb-px  last:mr-0 cursor-pointer  flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal"
            v-on:click="toggleTabs(1, 'all')"
            v-bind:class="{ 'rounded-lg bg-smooth': openTab !== 1, 'rounded-lg text-primary bg-white': openTab === 1 }">
            {{ $t('order.allOrders') }} <span
              v-bind:class="{ 'py-2 px-2': openTab !== 1, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 1 }">
              {{ orders?.total }}</span>

          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal"
            v-on:click="toggleTabs(2, 'pending')"
            v-bind:class="{ 'rounded-lg bg-smooth': openTab !== 2, 'rounded-lg text-primary bg-white': openTab === 2 }">
            {{ $t('order.new') }} <span
              v-bind:class="{ 'py-2 px-2': openTab !== 2, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 2 }">
              {{ pendingCount }}</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal"
            v-on:click="toggleTabs(3, 'approved')"
            v-bind:class="{ 'rounded-lg bg-smooth': openTab !== 3, 'rounded-lg text-primary bg-white': openTab === 3 }">
            {{ $t('app.Approved') }}<span
              v-bind:class="{ 'py-2 px-2': openTab !== 3, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 3 }">
              {{ approvedCount }}</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal"
            v-on:click="toggleTabs(4, 'rejected')"
            v-bind:class="{ 'rounded-lg bg-smooth': openTab !== 4, 'rounded-lg text-primary bg-white': openTab === 4 }">
            {{ $t('app.Rejected') }} <span
              v-bind:class="{ 'py-2 px-2': openTab !== 4, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 4 }">
              {{ rejectCount }}</span>
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
          <div class="tab-content input-wrapper tab-space">
            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
              <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />
            </div>
            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
              <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />

            </div>
            <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
              <!--             <FilterOrderSecond />-->
              <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />
            </div>
            <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
              <!--              <FilterOrderSecond />-->
              <FilterData @filter-update="filterUpdate" @clear-filter="toggleTabs(openTab, status)" :tap="openTab" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------- -->
    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
      <div class="text-center flex justify-center">
        <spinner :radius="100" v-if="loading" />
      </div>
      <div class="flex-auto ">
        <div class="tab-content input-wrapper tab-space">
          <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
            <CartOrder v-for="(order, index) in orders?.data" :key="index" :order="order" v-if="!loading">
              <button class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold"
              v-if="$can('approve_orders')"
                @click="rejectModalShow(order)">{{ $t('order.rejectOrder') }}</button>
              <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold"
              v-if="$can('approve_orders')"
                @click="approvedModalShow(order)">{{ $t('order.approveOrder') }}</button>
            </CartOrder>
            <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page" :page="orders?.current_page"
              v-if="!loading" />
            <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>
          </div>
          <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
            <CartOrder v-for="(order, index) in orders?.data" :key="index" :order="order" v-if="!loading">
              <button class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold"
              v-if="$can('approve_orders')"
                @click="rejectModalShow(order)">{{ $t('order.rejectOrder') }}</button>
              <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold"
              v-if="$can('approve_orders')"
                @click="approvedModalShow(order)"> {{ $t('order.approveOrder') }}</button>
            </CartOrder>
            <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page" :page="orders?.current_page"
              v-if="!loading" />
            <div v-else class="flex justify-center text-center py-5 w-100 "> {{ $t('app.tableEmptyData') }} </div>
          </div>
          <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
            <CartOrder v-for="(order, index) in orders?.data" :key="index" :order="order" v-if="!loading" />
          </div>
          <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
            <CartOrder v-for="(order, index) in orders?.data" :key="index" :order="order" v-if="!loading" />
          </div>
        </div>
      </div>
    </div>

   
    <delete-modal  v-if="approvedModal" @closeModal="handleModalClose" class="flex items-center justify-center">
      <template #title>
        <h2 class="text-center font-medium text-lg">{{ $t('approveModal.titleModel') }}</h2>
      </template>
      <template #buttons>
        <div class="flex justify-end mt-4 gap-1">
          <button @click="handleModalClose" class="bg-gray-300 px-4 w-[100px] text-primary p-3 rounded leading-3">{{
        $t('approveModal.cancel') }}</button>
          <button @click="approveOrderSave" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{
        $t('approveModal.save') }}</button>
        </div>
      </template>
    </delete-modal>

    <OrderReject v-if="rejectModal" @close="rejectModalClose" :reasonsRejection="reasonsRejection?.data"
      :selectedOrders="selectedOrders" @save="saveReject" />
  </check-validity>
</template>

<script>
import FilterOrderSecond from "./components/FilterOrderSecond.vue";
import CartOrder from "./components/CartOrder.vue";
import { mapActions, mapGetters } from "vuex";
import Spinner from "../../components/Spinner.vue";
import FilterData from "../orders/component/FilterData.vue";
import Pagination from "../../components/partials/Pagination.vue";

export default {
  components: { Pagination, FilterData, Spinner, CartOrder, FilterOrderSecond },
  data() {
    return {
      selectedOrders: [],
      openTab: 1,
      approvedModal: false,
      rejectModal: false,
      loading: false,
      status: 'pending',
      pendingCount: 0,
      rejectCount: 0,
      approvedCount: 0,
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
    ...mapActions('order', ['getReasonsRejection', 'changeStatus', 'approveOrder']),
    ...mapActions('common', ['deleteData', 'getRequest', 'emptyAllList']),
    async filterUpdate(result) {
      try {
        this.loading = true
        this.orders = await this.getRequest({
          params: {
            ...result,
          },
          api: "mainOrder"
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
          api: "mainOrder"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }

      this.status = status
      this.openTab = tabNumber
    },
    countStatus() {
      // this.pendingCount = 0;
      // this.rejectCount = 0;
      // this.approvedCount = 0;
      this.orders.data.forEach(order => {
        if (order.status == 'pending' || order.status == '') {
          this.pendingCount++;
        } else if (order.status === 'reject') {
          this.rejectCount++;
        } else if (order.status === 'approved') {
          this.approvedCount++;
        }
      });
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
      console.log(this.selectedOrders.length)
      if (this.selectedOrders.length > 0) {
        this.rejectModal = !this.rejectModal
      } else {
        this.selectedOrders.push(order);
        this.rejectModal = !this.rejectModal
      }
    },
    handleModalClose() {
      this.selectedOrders = [];
      this.approvedModal = false;
    },
    rejectModalClose() {
      this.selectedOrders = [];
      this.rejectModal = false;
    },
    async saveReject(data) {
      const response = await this.changeStatus({
        payload: {
          status: data.status,
          order_id: data.order_id,
          reject_reasons: data.reject_reasons
        }
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.orders.data[index].status = response.status;
      }
      this.rejectModalClose();
    },
    async saveRejectProduct(data) {
      this.loading = true;
      const response = await this.changeStatus({
        payload: {
          status: data.status,
          product_id: data.order.product.id,
          reject_reasons: data.reject_reasons
        }
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.orders.data[index].status = response.status;
      }
      this.approvedModal();
      this.loading = false;
    },
    async approveOrderSave() {
      const response = await this.changeStatus({
        payload: {
          status: 'approved',
          order_id: this.selectedOrders[0].order_id,
          reject_reasons: null
        }
      })
      const index = this.orders.data.findIndex(order => order.order_id === response.order_id);
      if (index !== -1) {
        this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], { status: response.status }));
      }
      this.handleModalClose();
    },
    clearFilter() {
      this.getOrder({
        payload: {
          page: 1
        }
      });
    },
    async fetchingData() {
      try {
        this.loading = true
        this.orders = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
          },
          api: "mainOrder"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
  },
  async mounted() {
    this.getReasonsRejection();
    this.fetchingData()

  },


}
</script>
