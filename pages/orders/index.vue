<template>
  <div :class="{loading: loading}">
  <div class="orders">
    <div class="card p-4">
      <h4 class="font-bold">{{$t('order.allOrders')}}</h4>
      <ul class="flex mb-0 list-none flex-wrap pt-3 w-2/4 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(1)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 1, 'border-b-2  border-primary text-primary': openTab === 1}">
            {{$t('order.allOrders')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(2)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 2, 'border-b-2  border-primary text-primary': openTab === 2}">
            {{$t('order.pendingApproval')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(3)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 3, 'border-b-2    border-primary text-primary': openTab === 3}">
            {{$t('order.readyForPickup')}}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(4)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 4, 'border-b-2   border-primary text-primary': openTab === 4}">
            {{$t('order.rejected')}}
          </a>
        </li>
      </ul>
    </div>

    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
      <FilterData :orders="orders?.data" @clear-filter="clearFilter" />
      <div class="flex-auto ">
        <spinner :radius="100" v-if="loading" />
        <div class="tab-content input-wrapper tab-space">
          <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="card my-2 p-4" v-for="(order,index) in orders?.data" :key="index">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <input type="checkbox"  @change="setSelectedOrder(order,$event.target.checked)">
                  </div>
                  <div>
                    <p>{{$t('order.order')}}: </p>
                    <p class="font-bold">{{ order?.order_id }}</p>
                  </div>
                  <div>
                    <p>{{$t('order.orderPlaced')}}:</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>{{$t('order.paymentMethod')}}:</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>{{$t('order.payment')}}:</p>
                    <p class="font-bold"
                    ><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                                        Paid</span>
                    </p>
                  </div>
                  <div>
                    <p>{{$t('order.status')}}:</p>
                    <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                                        {{order?.status}}
                                    </span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>{{$t('order.total')}}:</p>
                    <p><strong>
                      {{order?.order_total }}
                    </strong> <span>SAR</span></p>
                  </div>
                  <div>
                    <button @click="rejectModalShow(order)" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">{{$t('order.rejectOrder')}}</button>
                  </div>
                  <div>
                    <button @click="approvedModalShow(order)" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">{{$t('order.approveOrder')}}</button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <TablePending >
                        <tr class=" "  v-for="(subItem , index) in order.sub_order_items" :key="index">
                          <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <LazyImage
                                :data-src="subItem.product.image"
                                :title="subItem.product.title"
                                :alt="subItem.product.title"
                                class="w-10 h-10"
                              />
                              <div>
                                <a href="">{{subItem.product.title.slice(0, 30)}}</a>
                                <p>Sku: {{subItem.product.sku}}</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">{{$t('order.available')}}</option>
                              <option value="">{{$t('order.noAvailable')}}</option>
                            </select>
                          </td>
                        </tr>
                      </TablePending>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page"
                        :page="order?.current_page"
            />
          </div>
          <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
            <div class="card my-2 p-4" v-for="(order,index) in orders?.data" :key="index"
                 v-show="order.status === 'pending'"
            >
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <input type="checkbox"  @change="setSelectedOrder(order,$event.target.checked)">
                  </div>
                  <div>
                    <p>{{$t('order.order')}}: </p>
                    <p class="font-bold">{{ order?.order_id }}</p>
                  </div>
                  <div>
                    <p>{{$t('order.orderPlaced')}}:</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>{{$t('order.paymentMethod')}}:</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>{{$t('order.payment')}}:</p>
                    <p class="font-bold"
                    ><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">
                                        Paid</span>
                    </p>
                  </div>
                  <div>
                    <p>{{$t('order.status')}}:</p>
                    <p class="font-bold"><span class="bg-theemlight
                                    px-2 text-theem rounded-3xl text-[12px]">
                                        {{order?.status}}
                                    </span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>{{$t('order.total')}}:</p>
                    <p><strong>
                      {{order?.order_total }}
                    </strong> <span>SAR</span></p>
                  </div>
                  <div>
                    <button @click="rejectModalShow(order)" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">{{$t('order.rejectOrder')}}</button>
                  </div>
                  <div>
                    <button @click="approvedModalShow(order)" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">{{$t('order.approveOrder')}}</button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <TablePending >
                        <tr class=" "  v-for="(subItem , index) in order.sub_order_items" :key="index"

                        >
                          <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <LazyImage
                                :data-src="subItem.product.image"
                                :title="subItem.product.title"
                                :alt="subItem.product.title"
                                class="w-10 h-10"
                              />
                              <div>
                                <a href="">{{subItem.product.title.slice(0, 30)}}</a>
                                <p>Sku: {{subItem.product.sku}}</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>
                          <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">{{$t('order.available')}}</option>
                              <option value="">{{$t('order.noAvailable')}}</option>
                            </select>
                          </td>
                        </tr>

                      </TablePending>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pagination :total-page="orders?.last_page" :page-per="orders?.per_page"
                        :page="order?.current_page"
            />
          </div>

        </div>
      </div>
    </div>

  <OrderApprovedModal :selectedOrders="selectedOrders" v-if="approvedModal" @save="saveRejectProduct" @approveOrder="approveOrderSave" :reasonsRejection="reasonsRejection.data" @close="handleModalClose"/>
  <OrderReject v-if="rejectModal" @close="rejectModalClose" :reasonsRejection="reasonsRejection.data" :selectedOrders="selectedOrders" @save="saveReject" />
  </div>
  </div>
</template>

<script>
import { mapGetters , mapActions } from "vuex";
import LazyImage from "../../components/LazyImage.vue";
import Spinner from "../../components/Spinner.vue";
import TablePending from "./component/TablePending.vue";
import FilterData from "./component/FilterData.vue";
import Pagination from "../../components/partials/Pagination.vue";

export default{
  components: {Pagination, FilterData, TablePending, Spinner, LazyImage},
  data(){
   return{
    openTab:  1,
     loading: true,
    approvedModal:false,
     selectedOrders:[],
    rejectModal:false,

     RejectionOrder:"",
    productTable:{
      1:false,
      2:false
    }
   }
  },
 computed :{
    ...mapGetters('order',['orders','reasonsRejection'])
 },
  methods:{
    ...mapActions('order',['getOrder','getReasonsRejection','changeStatus','approveOrder']),

    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    productTableShow(index){
      this.productTable[index] = !this.productTable[index]
    },
    approvedModalShow(order){
      this.$store.commit('order/EMPTY_ORDER_SELECTED');
      if(this.selectedOrders.length > 0) {
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED',order);
      } else {
        this.selectedOrders.push(order);
        this.$store.commit('order/SET_ORDER_SELECTED',order);
      }
      this.approvedModal = !this.approvedModal
    },

    fetchingData(data) {
      // console.log('data', data);
      // this.getOrder({
      //   payload: {
      //     page: data.page
      //   }
      // });
    },
    rejectModalShow(order){
      if(this.selectedOrders.length > 0) {
        this.rejectModal = !this.rejectModal
      } else {
        this.selectedOrders.push(order);
        this.rejectModal = !this.rejectModal
      }
    },
    saveReject(data) {
      this.loading= true;
      this.changeStatus({
         payload:{
           status: data.status,
           order_id: data.order_id.slice(0, -2),
           reject_reasons: data.reject_reasons
         }
      })
      this.getOrder();
      this.rejectModalClose();
      this.loading= false;
    },
    saveRejectProduct(data) {
      this.loading= true;
      this.changeStatus({
        payload:{
          status: data.status,
          product_id: data.order.product.id,
          reject_reasons: data.reject_reasons
        }
      })
      this.approvedModal();
      this.loading= false;
    },
    approveOrderSave(data) {
      this.approveOrder({
        payload:data
      })
    },
    handleModalClose() {
      this.selectedOrders=[];
      this.approvedModal = false;
    },
    rejectModalClose(){
      this.selectedOrders=[];
      this.rejectModal = false;
    },
    setSelectedOrder(order,checked) {
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
    clearFilter() {
      this.getOrder({
        payload:{
          page:  1
        }
      });
    }
  },
  mounted() {
    this.getOrder({
      payload:{
        page: this.$route.query.page ? this.$route.query.page : 1
      }
    });
    this.getReasonsRejection();
    this.loading= false;
  }

}
</script>
