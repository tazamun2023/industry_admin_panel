import Service from '@/services/service.js';

const state = () => ({
  allRfqRejectReason: null,

  activeRfqInquiries: null,
  activeInquiryData: null,
  activeInquiryIndex: null,
  isNewInquiryOffer: false,
  isReadMessage: false,
  isFetchingRfqOffer: false,
});

const getters = {
  allRfqRejectReason: ({allRfqRejectReason}) => allRfqRejectReason,

  activeRfqInquiries: state => state.activeRfqInquiries,
  activeInquiryData: state => state.activeInquiryData,
  isNewInquiryOffer: state => state.isNewInquiryOffer,
  isReadMessage: state => state.isReadMessage,
  isFetchingRfqOffer: state => state.isFetchingRfqOffer,
  activeInquiryIndex: state => state.activeInquiryIndex
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

  SET_ACTIVE_INQUIRIES_OFFER_INDEX(state, data) {
    state.activeInquiryIndex = data;
  },
  CLEAR_ACTIVE_INQUIRIES_OFFER_INDEX(state) {
    state.activeInquiryIndex = null;
  },

  SET_SEND_NEW_INQUIRIES_OFFER(state) {
    state.isNewInquiryOffer = true;
  },
  SET_READ_MESSAGE(state) {
    state.isReadMessage = true;
  },
  SET_IS_FETCHING_RFQ_MESSAGE(state) {
    state.isFetchingRfqOffer = true;
  },
  CLEAR_IS_FETCHING_RFQ_MESSAGE_CLEAR(state) {
    state.isFetchingRfqOffer = false;
  },
  CLEAR_READ_MESSAGE(state) {
    state.isReadMessage = false;
  },
  CLEAR_SEND_NEW_INQUIRIES_OFFER(state) {
    state.isNewInquiryOffer = false;
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
    // commit('SET_ACTIVE_RFQ_INQUIRIES'); // Clear previous data
    commit('SET_ACTIVE_RFQ_INQUIRIES', data); // Set active RFQ inquiries
  },

  setActiveInquiriesOffer({ commit, state }, data) {
    // commit('CLEAR_ACTIVE_INQUIRIES_OFFER'); // Set active inquiries offer
    commit('SET_ACTIVE_INQUIRIES_OFFER', data); // Set active inquiries offer
  },

  clearActiveInquiriesOffers({ commit }) {
    commit('CLEAR_ACTIVE_INQUIRIES_OFFER');
  },

  clearActiveRfqData({ commit }) {
    commit('CLEAR_ACTIVE_RFQ_INQUIRIES');
  },

  setInquiriesOfferIndex({ commit, state }, data) {
    commit('SET_ACTIVE_INQUIRIES_OFFER_INDEX', data); // Set active inquiries offer index
  },

  clearIsInquiriesOfferIndex({ commit }) {
    commit('CLEAR_ACTIVE_INQUIRIES_OFFER_INDEX');
  },

  setIsInquiriesOffer({ commit }) {
    commit('SET_SEND_NEW_INQUIRIES_OFFER', true); // Set active inquiries offer
  },

  setIsReadMessage({ commit }) {
    commit('SET_READ_MESSAGE', true); // Set active inquiries offer
  },
  clearIsReadMessage({ commit }) {
    commit('CLEAR_READ_MESSAGE', false); // Set active inquiries offer
  },
  clearIsNewOffer({ commit }) {
    commit('CLEAR_SEND_NEW_INQUIRIES_OFFER');
  },
  setIsFetchingRfq({ commit }) {
    commit('SET_IS_FETCHING_RFQ_MESSAGE', false); // Set active inquiries offer
  },
  clearIsFetchingRfq({ commit }) {
    commit('CLEAR_IS_FETCHING_RFQ_MESSAGE_CLEAR');
  },
};

export {
  state,
  getters,
  mutations,
  actions
};
