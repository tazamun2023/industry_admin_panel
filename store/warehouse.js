import Service from '@/services/service.js'

const state = () =>({
  airPort : [],
  seaPort : []
});

const getters ={
  airPort: ({airPort}) => airPort,
  seaPort: ({seaPort}) => seaPort,
}

const mutations ={

  SET_ALL_AIR_PORT(state, airPort) {
    state.airPort = airPort
   /* airPort.forEach((item) => {
      state.airPort = {...state.airPort, ...{[item.id]: {id: item.id, name: item.name}}}
    })*/
  },

  SET_ALL_SEA_PORT(state, seaPort) {
    state.seaPort = seaPort
   /* seaPort.forEach((item) => {
      state.seaPort = {...state.seaPort, ...{[item.id]: {id: item.id,name: item.name}}}
    })*/
  },

}

const actions ={
  async nearAirPort({rootState, commit}, {id, api, mutation}) {    
    const {data} = await Service.getById(id,{}, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit(mutation, data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  },

  async nearSeaPort({rootState, commit}, {id, api, mutation}) {
    const {data} = await Service.getById(id,{}, this.$auth.strategy.token.get(), api, rootState.language.langCode)
    if (data.status === 200) {
      commit(mutation, data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message})
    }
  }


}

export {
  state,
  getters,
  mutations,
  actions
}


