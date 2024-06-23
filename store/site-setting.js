import Service from '@/services/service.js'

const state = () => ({
  siteSetting: null
})
const getters = {
  siteSetting: ({siteSetting}) => siteSetting
}
const mutations = {
  SET_SITE_SETTING(state, setting) {
    state.siteSetting = {...state.siteSetting, ...setting}
  }
}

const actions = {
  async setPolice({commit, dispatch}, {result, type,api= 'setPolice'},) {
    const {data} = await Service.setRequest(result, this.$auth.strategy.token.get(),api)
    if (data.status === 200) {
      if (type === 'system')
        commit('SET_SITE_SETTING', data.data)
      else
        dispatch('admin/setPolices', data.data, {root: true})
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
