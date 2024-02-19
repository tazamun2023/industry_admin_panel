import Service from '@/services/service.js'

const state = () => ({
  notificationList: null,
})
const getters = {
  notificationList: ({notificationList}) => notificationList,
}
const mutations = {
  SET_RFQ_NOTIFICATION_DATA(state, data) {
    state.notificationList = data
  },

}

const actions = {
  async submitData({rootState, commit, dispatch}, {id, params, api}) {
    const {data} = await Service.putById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_RFQ_NOTIFICATION_DATA', data)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data.data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data;
  },

  async getRfqNotificationData({rootState, commit, dispatch}, {id, params, api}) {
    const {data} = await Service.getById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    console.log('data', data)
    if (data.status === 200) {
      commit('SET_RFQ_NOTIFICATION_DATA', data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }

  },

  async getAllCustomer({rootState, commit}, {params, api}) {
    const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_RFQ_NOTIFICATION_DATA', data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }

  },

  async changeCustomerStatus({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data;
  },

}

export {
  state,
  getters,
  mutations,
  actions
}
