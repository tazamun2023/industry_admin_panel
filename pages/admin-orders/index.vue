<template>
  <div class="orders card p-4">
    <spinner :radius="100" v-if="loading"/>
    <div class="p-4">
      <h3 class="uppercase">{{ $t('error.orders') }}</h3>
      <ul class="flex list-none bg-smooth shadow flex-wrap rounded-xl p-1  w-2/5  my-3 flex-row">
        <li class="-mb-px  last:mr-0 cursor-pointer  flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(1)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 1, 'rounded-lg text-primary bg-white': openTab === 1}">
            {{$t('order.allOrders')}} <span v-bind:class="{'py-2 px-2': openTab !== 1, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 1}">150</span>

          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(2)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 2, 'rounded-lg text-primary bg-white': openTab === 2}">
            {{$t('order.new')}}  <span v-bind:class="{'py-2 px-2': openTab !== 2, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 2}">150</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(3)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 3, 'rounded-lg text-primary bg-white': openTab === 3}">
              {{$t('app.Approved')}}<span v-bind:class="{'py-2 px-2': openTab !== 3, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 3}">150</span>
          </a>
        </li>
        <li class="-mb-px  last:mr-0 cursor-pointer flex-auto">
          <a class="text-xs font-bold capitalize p-2 flex justify-between items-center leading-normal" v-on:click="toggleTabs(4)"
             v-bind:class="{'rounded-lg bg-smooth': openTab !== 4, 'rounded-lg text-primary bg-white': openTab === 4}">
            {{$t('app.Rejected')}} <span v-bind:class="{'py-2 px-2': openTab !== 4, 'shadow py-2 px-2 bg-primarylight rounded-lg': openTab === 4}">150</span>
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <FilterData :orders="orders?.data" @clear-filter="clearFilter" />
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <FilterData :orders="orders?.data" @clear-filter="clearFilter" />

            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
             <FilterOrderSecond />
            </div>
            <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
              <FilterOrderSecond />
            </div>
            </div>
        </div>
        </div>
    </div>
<!-- ------------------------------------- -->
  <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">
              <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
               <CartOrder v-for="(order,index) in orders?.data" :key="index" :order="order">
                 <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold"
                          @click="rejectModalShow(order)">{{ $t('order.rejectOrder') }}</button>
                 <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold"
                         @click="approvedModalShow(order)">{{ $t('order.approveOrder') }}</button>
               </CartOrder>
                <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page"
                            :page="order?.current_page" />
             </div>
             <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
               <CartOrder v-for="(order,index) in orders?.data" :key="index" :order="order" >
                 <button  class="hover:border-2 hover:border-error p-2 rounded-lg leading-3 uppercase font-bold" @click="rejectModalShow(order)">{{ $t('order.rejectOrder') }}</button>
                 <button class="border-2 border-primary p-2 rounded-lg  text-primary  leading-3 uppercase font-bold" @click="approvedModalShow(order)"> {{ $t('order.approveOrder') }}</button>
               </CartOrder>
               <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page"
                           :page="order?.current_page" />
             </div>
             <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
               <CartOrder v-for="(order,index) in orders?.data" :key="index" :order="order" />
             </div>
             <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
               <CartOrder v-for="(order,index) in orders?.data" :key="index" :order="order" />
             </div>
        </div>
    </div>
  </div>
<!--  <OrderApprovedModal v-if="approvedModal" @close="handleModalClose"/>-->
<!--  <OrderReject v-if="rejectModal" @close="rejectModalClose"/>-->
    <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct"
                        @approveOrder="approveOrderSave" :reasonsRejection="reasonsRejection?.data"
                        @close="handleModalClose"/>
    <OrderReject v-if="rejectModal" @close="rejectModalClose" :reasonsRejection="reasonsRejection?.data"
                 :selectedOrders="selectedOrders" @save="saveReject"/>
  </div>
</template>

<script>
import FilterOrderSecond from "./components/FilterOrderSecond.vue";
import CartOrder from "./components/CartOrder.vue";
import {mapActions, mapGetters} from "vuex";
import Spinner from "../../components/Spinner.vue";
import FilterData from "../orders/component/FilterData.vue";
import Pagination from "../../components/partials/Pagination.vue";

export default{
  components: {Pagination, FilterData, Spinner, CartOrder, FilterOrderSecond},
data(){
 return{
   selectedOrders: [],
  openTab:  1,
  approvedModal:false,
  rejectModal:false,
   loading: false,
  productTable:{
    1:false,
    2:false
  }
 }
},
  computed: {
    ...mapGetters('order', ['orders', 'reasonsRejection'])
  },
  middleware: ['common-middleware', 'auth'],
methods:{
  ...mapActions('order', ['getOrder', 'getReasonsRejection', 'changeStatus', 'approveOrder']),
  toggleTabs: function (tabNumber) {
    this.openTab = tabNumber
  },
  productTableShow(index){
    this.productTable[index] = !this.productTable[index]
  },
  approvedModalShow(order){
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
  handleModalClose() {
    this.selectedOrders = [];
    this.approvedModal = false;
  },
  rejectModalClose() {
    this.selectedOrders = [];
    this.rejectModal = false;
  },
  saveReject(data) {
    this.loading = true;
    this.changeStatus({
      payload: {
        status: data.status,
        order_id: data.order_id.slice(0, -2),
        reject_reasons: data.reject_reasons
      }
    })
    this.getOrder();
    this.rejectModalClose();
    this.loading = false;
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
  approveOrderSave(data) {
    this.approveOrder({
      payload: data
    })
  },
  clearFilter() {
    this.getOrder({
      payload: {
        page: 1
      }
    });
  }
},
async mounted() {
  await this.getOrder({
    payload: {
      page: this.$route.query.page ? this.$route.query.page : 1
    }
  });
  this.getReasonsRejection();
}

}
</script>
