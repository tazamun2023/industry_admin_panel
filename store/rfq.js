import Service from '@/services/service.js';

const state = () => ({
  allRfqRejectReason: null,

  activeRfqInquiries: null,
  activeInquiryData: null,
  activeInquiryIndex: null,
  isNewInquiryOffer: false,
  isReadMessage: false,
  isFetchingRfqOffer: false,
  inquiries: [],
});

const getters = {
  allRfqRejectReason: ({allRfqRejectReason}) => allRfqRejectReason,
  inquiries: ({inquiries}) => inquiries,

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
  SET_ALL_INQUIRIES(state, inquiries) {
    state.inquiries = inquiries;
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

  SET_ACTIVE_INQUIRIES_ONE_OFFER(state, data) {
    var index = state.activeInquiryData.inquiryOffers.findIndex(offer => offer.id == data.id);
    if (index > -1) {
      state.activeInquiryData.inquiryOffers.splice(index, 1);
    }

    state.activeInquiryData.inquiryOffers.push(data);
    var old_index = state.inquiries.findIndex(i => i.id == data.inquiry_id)

    // Remove the item from the specified index
    const item = state.inquiries.splice(old_index, 1)[0];
    state.inquiries.unshift(item);
    // Insert the item at the 0th index
    if (data.status != null) {
      state.inquiries[0].last_status = data.status
      state.activeInquiryData.inquiryOffers.forEach((item) => {
        if (data.inquiry_id != item.inquiry_id) {
          if (['pending_response',].includes(item.status))
            item.status = 'canceled'
        }
      })
    }


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

  async getInquiries({ rootState, commit }) {
    try {
      const { data } = await Service.getRequest(null, this.$auth.strategy.token.get(), 'getAllInquiries', rootState.language.langCode);

      // const {data} = await Service.getInquiries(
      //   {},
      //   this.$auth.strategy.token.get(), // Ensure this.$auth.strategy.token.get() is accessible
      //
      // );
      commit('SET_ALL_INQUIRIES', data.data);
      return data;
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      throw error; // Re-throw the error if you want to handle it later
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


  setActiveInquiriesOneOffer({commit, state}, data) {
    // commit('CLEAR_ACTIVE_INQUIRIES_OFFER'); // Set active inquiries offer
    commit('SET_ACTIVE_INQUIRIES_ONE_OFFER', data); // Set active inquiries offer
  },
};

export {
  state,
  getters,
  mutations,
  actions
};
