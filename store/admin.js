import Service from '@/services/service.js'
const state = () => ({
  profile: null,
  permissions: null,
  activated: false,
  publicKey: null,
  return_polices: null,
  sidebarPermissions: null,
  isVendor: null,
  isSuperAdmin: null,
})
const getters = {
  isSuperAdmin: ({isSuperAdmin}) => isSuperAdmin,
  isVendor: ({isVendor}) => isVendor,
  activated: ({activated}) => activated,
  publicKey: ({publicKey}) => publicKey,
  profile: ({profile}) => profile,
  return_polices: ({return_polices}) => return_polices,
  sidebarPermissions: ({sidebarPermissions}) => sidebarPermissions,
  permissions: ({permissions}) => permissions
}
const mutations = {
  SET_IS_VENDOR(state, isVendor) {
    state.isVendor = isVendor
  },
  SET_Return_Polices(state, return_polices) {
    state.return_polices = return_polices
  },
  SET_IS_SUPER_ADMIN(state, isSuperAdmin) {
    state.isSuperAdmin = isSuperAdmin
  },
  SET_ACTIVATED(state, activated) {
    state.activated = activated
  },
  SET_PUBLIC_KEY(state, key) {
    state.publicKey = key
  },
  SET_PROFILE(state, profile) {
    localStorage.setItem('getProfile', "sdfdsf")
    state.profile = profile
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },

  SET_SIDEBAR_PERMISSIONS(state, sidebarPermissions) {
    if(!state.sidebarPermissions){
      state.sidebarPermissions = {}
    }
    sidebarPermissions.forEach(i => {
      state.sidebarPermissions[i] = i
    })
  }
}

const actions = {
  setActivated({ commit }, {activated, public_key}){
    commit('SET_ACTIVATED', activated)
    commit('SET_PUBLIC_KEY', public_key)
  },


  setPolices({ commit },data){
    commit('SET_Return_Polices', data)
  },



  setProfile({ commit }, params) {

    commit('SET_PROFILE', params?.user)
    commit('SET_MEDIA_STORAGE', params?.media_storage, { root: true })
    commit('SET_DEFAULT_IMAGE', params?.default_image, { root: true })
    commit('SET_IMG_SRC_URL', params?.img_src_url, { root: true })
    commit('SET_THUMB_PREFIX', params?.thumb_prefix, { root: true })
    commit('SET_PERMISSIONS', params?.permissions)
    commit('SET_SIDEBAR_PERMISSIONS', params?.permissions)
    commit('SET_Return_Polices', params?.return_polices)
    commit('SET_IS_VENDOR', params?.vendor)
    commit('SET_ACTIVATED', params?.activated)
    commit('SET_IS_SUPER_ADMIN', params?.super_admin)
    commit('setting/SET_SETTING', params?.setting, { root: true })
    commit('setting/SET_STORE_DATA', params?.store, { root: true })

    commit('site-setting/SET_SITE_SETTING', params?.site_setting, { root: true })
    commit('user-message/SET_MESSAGES_COUNT', params?.message_count, { root: true })
  },
  async updateProfile ({ commit, dispatch }, params) {
    dispatch('ui/setErrors', null, { root: true })
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), 'setProfile')
    if(data.status === 200){
      commit('SET_PROFILE', data.data)
      dispatch('ui/setToastMessage', null, { root: true })
      return data
    } else if(data.status === 201) {
      dispatch('ui/setErrors', data.data, { root: true })
    } else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
  async setPassword ({ commit, dispatch  }, params) {
    dispatch('ui/setErrors', null, { root: true })
    const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), 'setPassword')
    if(data.status === 200){
      dispatch('ui/setToastMessage', data.message, { root: true })
      return data
    } else if(data.status === 201) {
      dispatch('ui/setErrors', data.data, { root: true })
      return data
    } else {
      return Promise.reject({statusCode: data.status, message: data.message })
    }
  },
}

export {
  state,
  getters,
  mutations,
  actions
}
