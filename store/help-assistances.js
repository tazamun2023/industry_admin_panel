import Service from '@/services/service.js'

const state = () => ({
  groups: [],

})
const getters = {
  groups: ({groups}) => groups,

}
const mutations = {

  SET_GROUPS(state, groups) {
    state.groups = groups
  },
  SET_HELP_ASSISTANCE(state, help) {
    state.groups[state.groups.findIndex(g => g.id === help.id)] = help
  },

  DELETE_GROUPS(state, group) {
    state.groups.splice(state.groups[state.groups.findIndex(g => g.id === group.id)], 1)
  },

  DELETE_HELP(state, help) {
    var g_index = state.groups.findIndex(g => g.id === help.help_assistants_group_id);
    console.log(help)
    console.log(g_index)
    state.groups[g_index].help_assistants.splice(state.groups[g_index].help_assistants.findIndex(h => h.id === help.id), 1)
  },

}

const actions = {
  updateStoreData({commit}, storeData) {
    commit('SET_STORE_DATA', storeData)
  },

  async getHelpAssistance({rootState, commit}) {
    const {data} = await Service.getRequest({}, this.$auth.strategy.token.get(), 'getHelpAssistance', rootState.language.langCode)
    if (data.status === 200) {
      commit('SET_GROUPS', data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },

  async setGroup({commit, dispatch}, params) {
    dispatch('ui/setErrors', null, {root: true})
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), 'setHelpAssistanceGroup')
    if (data.status === 200) {
      commit('SET_GROUPS', data.data)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {

      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },


  async deleteGroup({commit, dispatch}, params) {
    dispatch('ui/setErrors', null, {root: true})
    const {data} = await Service.deleteData(params.id, this.$auth.strategy.token.get(), 'deleteHelpAssistanceGroup')
    if (data.status === 200) {
      commit('DELETE_GROUPS', params)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },
  async setHelpAssistance({commit, dispatch}, params) {
    dispatch('ui/setErrors', null, {root: true})
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), 'setHelpAssistance')
    if (data.status === 200) {
      commit('SET_HELP_ASSISTANCE', data.data)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {

      dispatch('ui/setToastError', data.message, {root: true})
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },


  async deleteHelpAssistance({commit, dispatch}, params) {
    dispatch('ui/setErrors', null, {root: true})
    const {data} = await Service.deleteData(params.id, this.$auth.strategy.token.get(), 'deleteHelpAssistance')
    if (data.status === 200) {
      commit('DELETE_HELP', params)
      dispatch('ui/setToastMessage', data.message, {root: true})
      return data
    } else if (data.status === 201) {
      dispatch('ui/setToastError', data.message, {root: true})
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
