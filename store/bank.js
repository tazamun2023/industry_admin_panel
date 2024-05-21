import Service from "@/services/service.js";
const state = () => ({
  bankList: null,
});
const getters = {
  bankList: ({ bankList }) => bankList,
};
const mutations = {
  SET_VENDOR_BANK(state, data) {
    state.bankList = data;
  },

  SET_VENDOR_BANK_DATA(state, data) {
    state.bankList.push(data);
  },

  UPDATE_BANK(state, bank) {
    const index = state.bankList.findIndex((obj) => {
      return parseInt(obj.id) === parseInt(bank.id);
    });
    if (index > -1) {
      state.bankList.splice(index, 1, bank);
    } else {
      state.bankList.unshift(bank);
    }
  },

  DELETE_BANK_ITEM(state, cardID) {
    const index = state.bankList.findIndex((bank) => bank.id === cardID.id);
    if (index !== -1) {
      state.bankList.splice(index, 1);
    }
  },
};

const actions = {
  async getVendorBank({ rootState, commit }, { params, api }) {
    const { data } = await Service.getRequest(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit("SET_VENDOR_BANK", data.data.data);
    } else {
      return Promise.reject({ statusCode: data.status, message: data.message });
    }
  },

  async storeVendorBank({ commit, rootState }, { id, params, api }) {
    const { data } = await Service.setById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data?.status === 200) {
      return data;
    }
  },

  async putVendorBank({ commit, rootState }, { id, params, api }) {
    const { data } = await Service.putById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data?.status === 200) {
      commit("UPDATE_BANK", data.data);
    }
    return data;
  },

  async updateBank({ commit, rootState }, { id, params, api }) {
    const { data } = await Service.setById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    return data;
  },
  // SetDefaultBank
  async SetDefaultBank({ commit, rootState }, { params }) {
    const { data } = await Service.SetDefaultBank(
      params,
      this.$auth.strategy.token.get(),
      rootState.language.langCode
    );
    return data;
  },

  async vendorBankDelete({ commit, rootState }, { params, api }) {
    const { data } = await Service.deleteData(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data?.status === 200) {
      commit("DELETE_BANK_ITEM", data.data);
    }
    return data;
  },
};

export { state, getters, mutations, actions };
