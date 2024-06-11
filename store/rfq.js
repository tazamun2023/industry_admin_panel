import Service from '@/services/service.js';

const state = () => ({
  allRfqRejectReason: null,

  activeRfqInquiries: null,
  activeInquiryData: null
});

const getters = {
  allRfqRejectReason: ({allRfqRejectReason}) => allRfqRejectReason,

  activeRfqInquiries: state => state.activeRfqInquiries,
  activeInquiryData: state => state.activeInquiryData
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


  SET_ACTIVE_RFQ_INQUIRIES(state, data) {
    state.activeRfqInquiries = data;
  },
  CLEAR_ACTIVE_RFQ_INQUIRIES(state) {
    state.activeRfqInquiries = null;
  },
  SET_ACTIVE_INQUIRIES_OFFER(state, data) {
    state.activeInquiryData = data;
  },
  CLEAR_ACTIVE_INQUIRIES_OFFER(state) {
    state.activeInquiryData = null;
  },
};

const actions = {
  async getAllRfqRejectReason({ rootState, commit }) {
    try {
      console.log('SET_ALL_RFQ_REJECT_REASONS')
      const { data } = await Service.getRequest(null, this.$auth.strategy.token.get(), 'allRfqRejectReason', rootState.language.langCode);
      if (data.status === 200) {
        let result = data.data.all_rfq_reject_reasons;
        commit('SET_ALL_RFQ_REJECT_REASONS', result);
      } else {
        throw new Error(`Failed to fetch RFQ reject reasons: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },


  setActiveRfqInquiries({ commit, state }, data) {
    commit('SET_ACTIVE_RFQ_INQUIRIES'); // Clear previous data
    commit('SET_ACTIVE_RFQ_INQUIRIES', data); // Set active RFQ inquiries
  },

  setActiveInquiriesOffer({ commit, state }, data) {
    commit('CLEAR_ACTIVE_INQUIRIES_OFFER'); // Set active inquiries offer
    commit('SET_ACTIVE_INQUIRIES_OFFER', data); // Set active inquiries offer
  },

  clearActiveInquiriesOffers({ commit }) {
    commit('CLEAR_ACTIVE_INQUIRIES_OFFER');
  },

  clearActiveRfqData({ commit }) {
    commit('SET_ACTIVE_RFQ_INQUIRIES');
  },
};

export {
  state,
  getters,
  mutations,
  actions
};
