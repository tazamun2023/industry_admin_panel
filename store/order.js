import Service from '@/services/service.js'
const state = () => ({
  orders: null,
  orderDetails:"",
  reasonsRejection:[],
  selectedOrdersall:[]
})
const getters = {
  orders: ({orders}) => orders,
  orderDetails: ({orderDetails}) => orderDetails,
  reasonsRejection: ({reasonsRejection}) => reasonsRejection,
  selectedOrdersall: ({selectedOrdersall}) => selectedOrdersall,
}
const mutations = {
  SET_ORDER_DATA(state, orders) {
    state.orders = orders
  },
  SET_ORDER_SELECTED(state, selectedOrdersall) {
    state.selectedOrdersall = selectedOrdersall
  },
  // CHANGE_ORDER_SELECTED(state, product_id,reject_reasons) {
  //   state.selectedOrdersall?.map(order => {
  //     // التحقق من وجود sub_order_items
  //     if (order?.sub_order_items) {
  //       // تحديث العناصر داخل sub_order_items
  //       order?.sub_order_items?.map(item => {
  //         // التحقق من تطابق product_id
  //         if (item.product_id === product_id) {
  //           // تحديث القيم
  //           // item.status = "unavailable";
  //           // item.product_not_available_reason_id = 22;
  //           item.reason_id = reject_reasons;
  //         }
  //         return item;
  //       });
  //     }
  //     return order;
  //   });
  // },
  CHANGE_ORDER_SELECTED(state, {payload}) {
      console.log('payload',payload)
        state.selectedOrdersall?.sub_order_items.map(item => {
          // التحقق من تطابق product_id
          if (item.product_id === payload.product_id) {
            // تحديث القيم
            item.status_update = payload.status;
            item.reason_id = payload.reject_reasons;
          }
          return item;
        });
  },
  EMPTY_ORDER_SELECTED(state){
    state.selectedOrdersall="";
  },
  SET_ORDER_DETAILS(state, orderDetails) {
    state.orderDetails = orderDetails
  },
  SET_REASONS_REJECTION(state, reasonsRejection) {
    state.reasonsRejection = reasonsRejection
  },
}

const actions = {
  async getOrder ({ commit }) {
    const {data} = await Service.getData(this.$auth.strategy.token.get(), "subOrder")
    if(data.status === 200){
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  // reasonsRejection
  async getOrderDetails ({ commit },{id}) {
    const {data} = await Service.getOrderDetails(id,this.$auth.strategy.token.get())
    if(data.status === 200){
      commit('SET_ORDER_DETAILS', data.data)
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async getReasonsRejection ({ commit }) {
    const {data} = await Service.getReasonsRejection(this.$auth.strategy.token.get())
    if(data.status === 200){
      commit('SET_REASONS_REJECTION', data.data)
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async changeStatus ({ commit },{payload}) {
    const {data} = await Service.changeStatusOrder(this.$auth.strategy.token.get(),payload)
    if(data.status === 200){
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
}
}

export {
  state,
  getters,
  mutations,
  actions
}
