
import Service from '@/services/service.js'
const state = () => ({
    videoList: null,
  })
  const getters = {

    videoList: ({ videoList }) => videoList,
  }
  const mutations = {
    SET_VIDEO_LIST(state, data){
      state.videoList = data
    }, 
  }
  
  const actions = {
   async submitData ({rootState, commit }, {params,api}) {
        const {data} = await Service.setRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode)
        if (data.status === 200) {
            dispatch('ui/setToastMessage', data.message, {root: true})
            return data.data
          } else if (data.status === 201) {
            dispatch('ui/setErrors', data.data, {root: true})
          } else {
            return Promise.reject({statusCode: data.status, message: data.message})
          }
    },

    async allVideo({ commit }) {
      try {
        const response = await Service.setRequest(params, this.$auth.strategy.token.get(), api, rootState.language.langCode);
        commit('SET_VIDEO_LIST', response.data);
      } catch (error) {
        console.error('Error fetching video list:', error);
      }
    },
       
  }
  
  export {
    state,
    getters,
    mutations,
    actions
  }
  