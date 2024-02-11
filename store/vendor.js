
import Service from '@/services/service.js'
const state = () => ({
  vendorList: null,
})
const getters = {
  vendorList: ({ vendorList }) => vendorList,
}
const mutations = {
  SET_VENDOR_DATA(state, data){
    state.vendorList = data
  },
}

const actions = {
  async submitData ({rootState, commit , dispatch}, {id,params,api}) {
    const {data} = await Service.putById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data.data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data;
  },

  async getVendorData ({rootState, commit, dispatch}, {id, params,api}) {
    const {data} = await Service.getById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }

  },

  async getAllVendor ({rootState, commit}, {params,api}) {
    const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }

  },






}

export {
  state,
  getters,
  mutations,
  actions
}
