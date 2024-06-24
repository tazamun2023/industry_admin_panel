import Service from "@/services/service.js";

const state = () => ({
  bankList: null,
});
const getters = {
  bankList: ({bankList}) => bankList,
};
const mutations = {
  SET_VENDOR_BANK(state, data) {
    state.bankList = data;
  },

  SET_DefaultBank(state, data) {
    state.bankList.find(a => a.id === data.id).is_default = !(data.is_default)
  },
  SET_Banks_Default(state, data) {
    state.bankList.forEach(item => {
      item.is_default = item.id===data.id?data.is_default: false;
    });
  },
  SET_VENDOR_BANK_DATA(state, data) {
    state.bankList.unshift(data);
  },

  UPDATE_BANK(state, bank) {
    const index = state.bankList.findIndex((obj) => {
      return parseInt(obj.id) === parseInt(bank.id);
    });
    // state.bankList[index] = bank;
    if (index > -1) {
      state.bankList?.splice(index, 1, bank)
    } else {
      state.bankList?.unshift(bank)
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

  async setVendorBank({rootState, commit}, data) {
    commit('SET_VENDOR_BANK', data)
  },
  async setDefaultBank({rootState, commit}, data) {
    commit('SET_DefaultBank', data)
  },


  async getVendorBank({rootState, commit}, {params, api}) {
    const {data} = await Service.getRequest(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit("SET_VENDOR_BANK", data.data.data);
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async storeVendorBank({commit, rootState}, {id, params, api}) {
    const {data} = await Service.setById(
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

  async putVendorBank({commit, rootState}, {id, params, api}) {
    const {data} = await Service.putById(
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

  async updateBank({commit, rootState}, {id, params, api}) {
    const {data} = await Service.setById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    return data;
  },
  // SetDefaultBank
  async SetDefaultBank({commit, rootState}, {params}) {
    const {data} = await Service.SetDefaultBank(
      params,
      this.$auth.strategy.token.get(),
      rootState.language.langCode
    );
    if (data?.status === 200) {
      commit("SET_Banks_Default", data.data);
    }
    return data;
  },

  async vendorBankDelete({commit, rootState}, {params, api}) {
    const {data} = await Service.deleteData(
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

export {state, getters, mutations, actions};
