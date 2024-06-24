import Service from '@/services/service.js'

const state = () => ({
  langData: null,
  langCode: false,
  languages: {},
  defaultLanguage: {
    name: 'English',
    code: 'en'
  },
  currentLanguage: {
    name: 'English',
    code: 'en'
  },
})
const getters = {
  langCode: ({ langCode }) => langCode,
  languages: ({ languages }) => languages,
  defaultLanguage: ({ defaultLanguage }) => defaultLanguage,
  currentLanguage: ({ currentLanguage }) => currentLanguage,
  langData: ({ langData }) => langData
}
const mutations = {
  SET_LANG_CODE(state, langCode){
    state.langCode = langCode
  },
  SET_DEFAULT_LANGUAGE(state, defaultLanguage){
    state.defaultLanguage = defaultLanguage
  },
  SET_CURRENT_LANGUAGE(state, currentLanguage){
    state.currentLanguage = currentLanguage
  },
  SET_LANGUAGES(state, languages){
    languages.forEach(i => {
      state.languages[i.code] = i
    })
  },
  SET_LANG_DATA (state, langData) {
    state.langData = langData
  },
}

const actions = {
  setLangCode({ commit }, payload) {
    commit('SET_LANG_CODE', payload)
  },
  setDefaultLanguage({ commit }, payload) {
    commit('SET_DEFAULT_LANGUAGE', payload)
  },
  setCurrentLanguage({ commit }, payload) {
    commit('SET_CURRENT_LANGUAGE', payload)
  },
  setLanguages({ commit }, payload) {
    commit('SET_LANGUAGES', payload)
  },
  async getLangData({ state, commit, dispatch }, {i18n, token}) {
    return ;
    if(!state?.currentLanguage?.predefined) {
      try {
        const {data} = await Service.getRequest({
          locale_code: state?.currentLanguage?.code
        }, token, 'localization')

        if(data?.status ){

          if(data?.status === 200){

            commit('SET_LANG_DATA', data.data)

            i18n.setLocaleMessage(state?.currentLanguage?.code, data?.data)

          }

        } else {

          return Promise.reject({
            message: "API is down."
          })
        }
      }catch (e) {

        return Promise.reject({
          message: e.message
        })
      }
    }
  },

}

export {
  state,
  getters,
  mutations,
  actions
}
