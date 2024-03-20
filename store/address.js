
import Service from '@/services/service.js'
const state = () => ({
  addressList: null,
})
const getters = {
  addressList: ({ addressList }) => addressList,
}
const mutations = {
  SET_VENDOR_ADDRESS(state, data){
    state.addressList = data
  },

  UPDATE_ADDRESS(state, address) {
    const index = state.addressList?.findIndex(obj => {
      return parseInt(obj.id) === parseInt(address.id)
    })
    if (index > -1) {
      state.addressList?.splice(index, 1, address)
    } else {
      state.addressList?.unshift(address)
    }
  }
}

const actions = {

  // async getVendorAddress ({rootState, commit}, {params,api}) {
  //   const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
  //   if (data.status === 200) {
  //     commit('SET_VENDOR_ADDRESS', data.data.data)
  //   } else {
  //     return Promise.reject({statusCode: data.status, message: data.message})
  //   }
  //
  // },
  async getVendorAddress ({rootState, commit}) {
    const {data} = await Service.getVendorAddress(this.$auth.strategy.token.get(), rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_ADDRESS', data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }

  },

  async userAddressAction({commit,dispatch}, params) {
    const {data} = await Service.userAddressAction(params, this.$auth.strategy.token.get())
    if (data?.status === 200) {
      // getVendorAddress
      dispatch('getVendorAddress');
      // commit('UPDATE_ADDRESS', data.data)
    }
    return data
  },

  async userAddressDelete({commit}, {id, params}) {
    const {data} = await Service.userAddressDelete(id, this.$auth.strategy.token.get(), params)
    return data
  },

  async updateAddress({commit}, {id, params}) {
    const {data} = await Service.userAddressUpdate(id, this.$auth.strategy.token.get(), params)
    return data
  },



}

export {
  state,
  getters,
  mutations,
  actions
}
