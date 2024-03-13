import Service from '@/services/service.js'
const state = () => ({
  orders: null,
  orderDetails:"",
  reasonsRejection:[]
})
const getters = {
  orders: ({orders}) => orders,
  orderDetails: ({orderDetails}) => orderDetails,
  reasonsRejection: ({reasonsRejection}) => reasonsRejection,
}
const mutations = {
  SET_ORDER_DATA(state, orders) {
    state.orders = orders
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
  async getReasonsRejection ({ commit },{id}) {
    const {data} = await Service.getOrderDetails(id,this.$auth.strategy.token.get())
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
