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
  SET_EMPTYـORDER(state) {
    state.orders = []
  },
  SET_ORDER_DATA_SEARCHE(state, orders) {
    state.orders.data = orders
  },
  SET_ORDER_SELECTED(state, selectedOrdersall) {
    state.selectedOrdersall = selectedOrdersall
  },

  CHANGE_ORDER_SELECTED(state, {payload}) {
      console.log('payload',payload)
        state.selectedOrdersall?.sub_order_items.map(item => {
          if (item.product_id === payload.product_id) {

            item.status= payload.status === 1 ? 'available' : "unavailable"
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
  async getOrder ({ commit }, {payload}) {
    const {data} = await Service.getData(this.$auth.strategy.token.get(), payload.page,null)
    if(data.status === 200){
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      commit('SET_EMPTYـORDER')
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async getDataPending ({ commit }, {payload}) {
    const {data} = await Service.getDataPending(this.$auth.strategy.token.get(), payload.page,null)
    if(data.status === 200){
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      commit('SET_EMPTYـORDER')
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async getDataOrderApproved ({ commit }, {payload}) {
    const {data} = await Service.getDataOrderApproved(this.$auth.strategy.token.get(), payload.page,null)
    if(data.status === 200){
      commit('SET_EMPTYـORDER')
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      commit('SET_EMPTYـORDER')
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async getDataOrderRejected ({ commit }, {payload}) {
    const {data} = await Service.getDataOrderRejected(this.$auth.strategy.token.get(), payload.page,null)
    if(data.status === 200){
      commit('SET_EMPTYـORDER')
      commit('SET_ORDER_DATA', data.data)
    }
    else {
      commit('SET_EMPTYـORDER')
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
  async getReasonsRejection ({ commit,dispatch }) {
    const {data} = await Service.getReasonsRejection(this.$auth.strategy.token.get())
    if(data.status === 200){
      commit('SET_REASONS_REJECTION', data.data)
      dispatch('ui/setToastMessage', data.message, {root: true})
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async changeStatus ({ commit,dispatch },{payload}) {
    const {data} = await Service.changeStatusOrder(this.$auth.strategy.token.get(),payload)
    if(data.status === 200){
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data.data;
    } else if(data.status === 500) {
      dispatch('ui/setToastError', data?.message, {root: true})
    }
    else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
},
  async approveOrder ({ commit,dispatch },{payload}) {
    const {data} = await Service.approveOrder(this.$auth.strategy.token.get(),payload)
    if(data.status === 200){
      dispatch('ui/setToastMessage', data.message, {root: true})
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
