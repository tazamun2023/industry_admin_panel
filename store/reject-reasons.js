import Service from '@/services/service.js'

const state = () => ({
  reject_reasons_types: null,

})
const getters = {
  reject_reasons_types: ({reject_reasons_types}) => reject_reasons_types,

}
const mutations = {

  SET_REJECT_REASONS(state, reject_reasons_types) {
    console.log(reject_reasons_types.length, reject_reasons_types[0])
    // Ensure state.reject_reasons_types is initialized as an object
    if (!state.reject_reasons_types) {
      state.reject_reasons_types = {};
    }

    if (reject_reasons_types.length > 0)
      state.reject_reasons_types[reject_reasons_types[0].type] = reject_reasons_types
  },


}

const actions = {
  updateStoreData({commit}, storeData) {
    commit('SET_REJECT_REASONS', storeData)
  },

  async getRejectReasons({rootState, commit}, params) {
    const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), 'RejectReasons', rootState.language.langCode)


    if (data.status === 200) {
      commit('SET_REJECT_REASONS', data.data)
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
