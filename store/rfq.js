import Service from '@/services/service.js';

const state = () => ({
  allRfqRejectReason: null,
});

const getters = {
  allRfqRejectReason: ({allRfqRejectReason}) => allRfqRejectReason,
};

const mutations = {
  SET_ALL_RFQ_REJECT_REASONS(state, allRfqRejectReason) {
    state.allRfqRejectReason = allRfqRejectReason
    // state.allRfqRejectReason = allRfqRejectReason.map(item => ({
    //   id: item.id,
    //   name: item.name,
    //   description: item.description,
    // }));
  },
};

const actions = {
  async getAllRfqRejectReason({ rootState, commit }) {
    try {
      console.log('SET_ALL_RFQ_REJECT_REASONS')
      const { data } = await Service.getRequest(null, this.$auth.strategy.token.get(), 'allRfqRejectReason', rootState.language.langCode);
      if (data.status === 200) {

        console.log("SET_ALL_RFQ_REJECT_REASONS")
        console.log(data)
        commit('SET_ALL_RFQ_REJECT_REASONS', data.data);
      } else {
        throw new Error(`Failed to fetch RFQ reject reasons: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
};

export {
  state,
  getters,
  mutations,
  actions
};
