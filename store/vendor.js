
import Service from '@/services/service.js'
const state = () => ({
  vendorList: null,
  addressList: null,
  vendorProfile: null,
  userInfo:null,
  AllRole: null
})
const getters = {
  vendorList: ({ vendorList }) => vendorList,
  addressList: ({ addressList }) => addressList,
  userInfo: ({ userInfo }) => userInfo,
  AllRole: ({ AllRole }) => AllRole,
}
const mutations = {

  SET_VENDOR_DATA(state, data){
    state.vendorList = data
  },

  SET_VENDOR_Profile(state, data){
    state.vendorProfile = data
  },

  SET_USERS_DATA(state, data){
    state.userInfo = data
  },

  SET_ROLE(state, data){
    state.AllRole = data
  },


}

const actions = {
  async submitData ({rootState, commit , dispatch}, {id,params,api}) {
    const {data} = await Service.putById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
      return data
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },

  async getAdminVendorData ({rootState, commit, dispatch}, {id, params,api}) {
    const {data} = await Service.getById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },

  async getVendorData ({rootState, commit, dispatch}, {params,api}) {
    const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_DATA', data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },

  async getVendorProfile ({rootState, commit, dispatch}, {id, params,api}) {
    const {data} = await Service.getById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_VENDOR_Profile', data)
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


  async changeVendorStatus ({rootState, commit , dispatch}, {params,api}) {
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

  async getUserByEmail ({rootState, commit , dispatch}, {params,api}) {
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_USERS_DATA', data.data)
    }else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data
  },

  async updateUserInformation ({rootState, commit , dispatch}, {id, params,api, lang}) {
    const {data} = await Service.setById(id, params, this.$auth.strategy.token.get(), api, lang)
    if (data.status === 200) {
      commit('SET_USERS_DATA', data.data)
    }else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data;

  },


  async getUserById ({rootState, commit , dispatch}, {id, params,api}) {
    const {data} = await Service.getById(id, params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_USERS_DATA', data.data)
    }else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data

  },


  async registerUser ({rootState, commit , dispatch}, {params,api, lang}) {
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), api, lang)
    if (data.status === 200) {
      commit('SET_USERS_DATA', data.data)
    }else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data
  },

  async getAllRoles ({rootState, commit , dispatch}, {params,api, lang}) {
    const {data} = await Service.getRequest(params, this.$auth.strategy.token.get(), api, lang)
    if (data.status === 200) {
      commit('SET_ROLE', data.data)
    }else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
    return data
  },

  async sentInvitation ({rootState, commit , dispatch}, {params,api, lang}) {
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), api, lang)
    return data

  },








}

export {
  state,
  getters,
  mutations,
  actions
}
