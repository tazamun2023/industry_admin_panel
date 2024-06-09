import Service from "@/services/service.js";
import Swal from "sweetalert2";

const state = () => ({
  filters: null,
  allCategories: null,
  allCategoriesTree: [],
  reject_reasons_types: [],
  allUnits: [],
  phoneCode: null,
  allCountries: [],
  allCitiesById: [],
  allTaxRules: null,
  allAttributes: null,
  allAttributeValues: null,
  allBrands: null,
  allSKus: null,
  is_sku_exsist: true,
  allProductCollections: null,
  allBundleDeals: null,
  allShippingRules: null,
  allPages: null,
  allPermissions: null,
  allSubscriptionEmailFormats: null,
  allRoles: null,
  allColors: null,
  allRejectReasons: null,
  allBarcodes: null,
  allPackagingUnits: null,
  allDimensionUnits: null,
  allWeightUnits: null,
  allStorageTemperatures: null,
  allTransportationModes: null,
  allWarehouses: null,
  allFlashSale: null,
  rfqFilterType: [
    {id: 1, title: "RfqID", value: "rfqId"},
    {id: 2, title: "Qoution Id", value: "qouId"},
    {id: 3, title: "Inquiry Id", value: "inqId"},
  ],
});
const getters = {
  allUnits: ({allUnits}) => allUnits,
  allTaxRules: ({allTaxRules}) => allTaxRules,
  is_sku_exsist: ({is_sku_exsist}) => is_sku_exsist,
  allAttributeValues: ({allAttributeValues}) => allAttributeValues,
  allAttributes: ({allAttributes}) => allAttributes,
  allBrands: ({allBrands}) => allBrands,
  allSKus: ({allSKus}) => allSKus,
  filters: ({filters}) => filters,
  allCategories: ({allCategories}) => allCategories,
  reject_reasons_types: ({reject_reasons_types}) => reject_reasons_types,
  allStorageTemperatures: ({allStorageTemperatures}) =>
    allStorageTemperatures,
  allCategoriesTree: ({allCategoriesTree}) => allCategoriesTree,
  allRejectReasons: ({allRejectReasons}) => allRejectReasons,
  phoneCode: ({phoneCode}) => phoneCode,
  allCountries: ({allCountries}) => allCountries,
  allFlashSale: ({allFlashSale}) => allFlashSale,
  allCitiesById: ({allCitiesById}) => allCitiesById,
  allProductCollections: ({allProductCollections}) => allProductCollections,
  allBundleDeals: ({allBundleDeals}) => allBundleDeals,
  allShippingRules: ({allShippingRules}) => allShippingRules,
  allPermissions: ({allPermissions}) => allPermissions,
  allRoles: ({allRoles}) => allRoles,
  allSubscriptionEmailFormats: ({allSubscriptionEmailFormats}) =>
    allSubscriptionEmailFormats,
  allPages: ({allPages}) => allPages,
  allColors: ({allColors}) => allColors,
  allBarcodes: ({allBarcodes}) => allBarcodes,
  allPackagingUnits: ({allPackagingUnits}) => allPackagingUnits,
  allDimensionUnits: ({allDimensionUnits}) => allDimensionUnits,
  allWeightUnits: ({allWeightUnits}) => allWeightUnits,
  allWarehouses: ({allWarehouses}) => allWarehouses,
  allTransportationModes: ({allTransportationModes}) =>
    allTransportationModes,
  rfqFilterType: ({rfqFilterType}) => rfqFilterType,
};
const mutations = {
  SET_ALL_PERMISSIONS(state, allPermissions) {
    state.allPermissions = allPermissions;
  },
  SET_IS_VAILD_SKU(state, isVaildSKU) {
    state.is_sku_exsist = isVaildSKU;
  },
  SET_Reject_Reasons_Types(state, reject_reasons_types) {
    state.reject_reasons_types = reject_reasons_types;
  },
  SET_ALL_FLASH_SALE(state, allFlashSale) {
    state.allFlashSale = allFlashSale;
  },
  SET_ALL_Units(state, allUnits) {
    state.allUnits = allUnits;
  },
  SET_ALL_ROLES(state, allRoles) {
    state.allRoles = {};
    allRoles.forEach((item) => {
      state.allRoles = {
        ...state.allRoles,
        ...{[item.name]: {title: item.name}},
      };
    });
  },
  SET_ALL_PAGES(state, allPages) {
    state.allPages = {};
    allPages.forEach((item) => {
      //if(item?.title?.trim()){
      state.allPages = {
        ...state.allPages,
        ...{[item.id]: {title: item.title}},
      };
      // }
    });
  },
  SET_ALL_CATEGORIES(state, allCategories) {
    state.allCategories = {};
    allCategories.forEach((item) => {
      state.allCategories = {
        ...state.allCategories,
        ...{[item.id]: {title: item.name}},
      };
    });
  },
  SET_ALL_STORAGE_TEMPERATURES(state, allStorageTemperatures) {
    state.allStorageTemperatures = {};
    allStorageTemperatures.forEach((item) => {
      state.allStorageTemperatures = {
        ...state.allStorageTemperatures,
        ...{[item.id]: {name: item.name}},
      };
    });
  },
  SET_ALL_WAREHOUSES(state, allWarehouses) {
    state.allWarehouses = {};
    allWarehouses.forEach((item) => {
      state.allWarehouses = {
        ...state.allWarehouses,
        ...{[item.id]: {name: item.name}},
      };
    });
  },
  SET_ALL_COLORS(state, allColors) {
    state.allColors = {};
    allColors.forEach((item) => {
      state.allColors = {
        ...state.allColors,
        ...{[item.id]: {name: item.name, id: item.id}},
      };
    });
  },
  SET_ALL_BARCODES(state, allBarcodes) {
    state.allBarcodes = {};
    allBarcodes.forEach((item) => {
      state.allBarcodes = {
        ...state.allBarcodes,
        ...{[item.id]: {name: item.name}},
      };
    });
  },

  PHONE_CODE(state, code) {
    state.phoneCode = code;
  },

  SET_ALL_PACKAGING_UNITS(state, allPackagingUnits) {
    state.allPackagingUnits = {};
    allPackagingUnits.forEach((item) => {
      state.allPackagingUnits = {
        ...state.allPackagingUnits,
        ...{[item.id]: {id: item.id, name: item.name}},
      };
    });
  },

  SET_ALL_PACKAGING_BOX_UNITS(state, allDimensionUnits) {
    state.allDimensionUnits = {};
    allDimensionUnits.forEach((item) => {
      state.allDimensionUnits = {
        ...state.allDimensionUnits,
        ...{[item.id]: {name: item.name}},
      };
    });
  },

  SET_ALL_PACKAGING_WEIGHT_UNITS(state, allWeightUnits) {
    state.allWeightUnits = {};
    allWeightUnits.forEach((item) => {
      state.allWeightUnits = {
        ...state.allWeightUnits,
        ...{[item.id]: {name: item.name}},
      };
    });
  },

  SET_ALL_CATEGORIES_Tree(state, allCategories) {
    state.allCategoriesTree = allCategories;
  },
  SET_ALL_Filters(state, filters) {
    state.filters = filters;
  },
  SET_SKU(state, sku) {
    state.allSKus.push(sku);
  },
  SET_ALL_COUNTRIES(state, allCountries) {
    state.allCountries = allCountries;
    /*  allCountries.forEach((item) => {
       state.allCountries = {...state.allCountries, ...{[item.id]: {id: item.id,name: item.name}}}
       })*/
  },
  SET_ALL_TRANSPORTATIONMODES(state, allTransportationModes) {
    state.allTransportationModes = {};
    allTransportationModes.forEach((item) => {
      state.allTransportationModes = {
        ...state.allTransportationModes,
        ...{[item.id]: {name: item.title}},
      };
      state.allCountries = {
        ...state.allCountries,
        ...{[item.id]: {name: item.name}},
      };
    });
  },

  SET_ALL_Cities(state, allCitiesById) {
    state.allCitiesById = allCitiesById;
    /*allCitiesById.forEach((item) => {
      state.allCitiesById = {...state.allCitiesById, ...{[item.id]: {title: item.name}}}
    })*/
  },

  SET_ALL_SUBSCRIPTION_EMAIL_FORMATS(state, allSubscriptionEmailFormats) {
    state.allSubscriptionEmailFormats = allSubscriptionEmailFormats;
  },
  SET_ALL_SHIPPING_RULES(state, allShippingRules) {
    state.allShippingRules = {};
    allShippingRules.forEach((item) => {
      state.allShippingRules = {
        ...state.allShippingRules,
        ...{[item.id]: {title: item.title}},
      };
    });
  },
  SET_ALL_PRODUCT_COLLECTIONS(state, allProductCollections) {
    state.allProductCollections = allProductCollections;
  },
  SET_ALL_BUNDLE_DEALS(state, allBundleDeals) {
    state.allBundleDeals = {};
    allBundleDeals.forEach((item) => {
      state.allBundleDeals = {
        ...state.allBundleDeals,
        ...{[item.id]: {title: item.title}},
      };
    });
  },
  SET_ALL_ATTRIBUTES(state, allAttributes) {
    state.allAttributes = allAttributes;

    let val = [];

    allAttributes.forEach((i) => {
      val = [...val, ...i.values];
    });

    state.allAttributeValues = val;
  },
  SET_ALL_BRANDS(state, allBrands) {
    state.allBrands = {};
    allBrands.forEach((item) => {
      state.allBrands = {
        ...state.allBrands,
        ...{[item.id]: {title: item.title, id: item.id}},
      };
    });
  },
  SET_ALL_SKUS(state, allSKus) {
    state.allSKus = {};
    Object.entries(allSKus).forEach(([sku, id]) => {
      state.allSKus[id] = {sku};
    });
  },
  SET_ALL_REJECT_REASONS(state, allRejectReasons) {
    state.allRejectReasons = {};
    allRejectReasons.forEach((item) => {
      state.allRejectReasons = {
        ...state.allRejectReasons,
        ...{
          [item.id]: {
            id: item.id,
            name: item.name,
            description: item.description,
          },
        },
      };
    });
  },
  SET_ALL_TAX_RULES(state, allTaxRules) {
    state.allTaxRules = {};
    allTaxRules.forEach((item) => {
      state.allTaxRules = {
        ...state.allTaxRules,
        ...{[item.id]: {title: item.title}},
      };
    });
  },
  EMPTY_ALL_LIST(state, storeAllVariable) {
    state[storeAllVariable] = null;
  },
};

const actions = {
  setAllFilters({commit}, filters) {
    commit('SET_ALL_Filters', filters)
  },
  setSku({commit}, sku) {
    commit('SET_SKU', sku)
  },

  setAllSubscriptionEmailFormats({commit}, allSubscriptionEmailFormats) {
    commit("SET_ALL_SUBSCRIPTION_EMAIL_FORMATS", allSubscriptionEmailFormats);
  },
  emptyAllList({commit}, storeAllVariable) {
    if (storeAllVariable) {
      commit("EMPTY_ALL_LIST", storeAllVariable);
    }
  },
  async getAllList({rootState, commit}, {api, mutation}) {
    const {data} = await Service.getRequest(
      {},
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit(mutation, data.data);
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getAllCountries({rootState, commit}, {api, mutation}) {
    const {data} = await Service.getRequest(
      {},
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit(mutation, data.data);
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getAllFlashSale({rootState, commit}, {api, mutation}) {
    const {data} = await Service.getRequest(
      {},
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit("SET_ALL_FLASH_SALE", data.data.data);
      // return data
      // commit(mutation, data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async checkIfVaildSKU({rootState, commit}, params) {
    const {data} = await Service.getRequest(
      params,
      this.$auth.strategy.token.get(),
      "checkIfVaildSKU",
      rootState.language.langCode
    );
    if (data.status === 200) {
      commit("SET_IS_VAILD_SKU", data.data);
      // return data
      // commit(mutation, data.data)
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getCitiesById({rootState, commit}, {id, api, mutation}) {
    const {data} = await Service.getById(
      id,
      {},
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );

    if (data.status === 200) {
      commit(mutation, data.data);
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getPhoneCode({commit}) {
    const {data} = await Service.phoneCode(this.$auth.strategy.token.get());
    if (data?.status === 200) {
      commit("PHONE_CODE", data.data);
    }
    return data;
  },

  async setWysiwygImage({commit, dispatch}, params) {
    dispatch("ui/setErrors", null, {root: true});
    const {data} = await Service.setRequest(
      params,
      this.$auth.strategy.token.get(),
      "setWysiwygImage"
    );
    if (data.status === 200) {
      dispatch("ui/setToastMessage", data.message, {root: true});
      return data.data;
    } else if (data.status === 201) {
      dispatch("ui/setErrors", data.data, {root: true});
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async getDropdownList({rootState, commit}) {
    // console.log('rootState.language', rootState.language.currentLanguage.code)
    const {data} = await Service.getRequest(
      null,
      this.$auth.strategy.token.get(),
      "getDropdownList",
      rootState.language.currentLanguage.code
    );
    if (data.status === 200) {
      const result = data.data;

      commit("SET_Reject_Reasons_Types", result.reject_reasons_types);
      commit("SET_ALL_CATEGORIES", result.categories);
      commit("SET_ALL_STORAGE_TEMPERATURES", result.storage_temperatures);
      commit("SET_ALL_WAREHOUSES", result.warehouses);
      commit("SET_ALL_COLORS", result.colors);
      commit("SET_ALL_BARCODES", result.barcodes);
      commit("SET_ALL_PACKAGING_UNITS", result.packagingUnits);
      commit("SET_ALL_PACKAGING_BOX_UNITS", result.carton_dimensions_box_units);
      commit(
        "SET_ALL_PACKAGING_WEIGHT_UNITS",
        result.carton_dimensions_weight_units
      );
      commit("SET_ALL_COUNTRIES", result.countries);
      commit("SET_ALL_TRANSPORTATIONMODES", result.transportation_modes);
      commit("SET_ALL_COUNTRIES", result.countries);
      commit("SET_ALL_SHIPPING_RULES", result.shipping_rules);
      commit("SET_ALL_PRODUCT_COLLECTIONS", result.product_collections);
      commit("SET_ALL_BUNDLE_DEALS", result.bundle_deals);
      commit("SET_ALL_ATTRIBUTES", result.attributes);
      commit("SET_ALL_BRANDS", result.brands);
      commit("SET_ALL_SKUS", result.vendor_skus);
      commit("SET_ALL_REJECT_REASONS", result.all_reject_reasons);
      commit("SET_ALL_TAX_RULES", result.tax_rules);
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async getCategoriesTree({rootState, commit}) {
    const {data} = await Service.getRequest(
      null,
      this.$auth.strategy.token.get(),
      "getCategoriesTree",
      rootState.language.langCode
    );
    if (data.status === 200) {
      const result = data.data;
      commit("SET_ALL_CATEGORIES_Tree", result);
      // state.allCategoriesTree=re
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async getAllUnits({rootState, commit}) {
    const {data} = await Service.getRequest(
      null,
      this.$auth.strategy.token.get(),
      "getAllUnits",
      rootState.language.langCode
    );
    if (data.status === 200) {
      const result = data.data;
      commit("SET_ALL_Units", result);
      // state.allCategoriesTree=re
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async getRequest({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.getRequest(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.currentLanguage.code
    );

    if (data.status === 200) {
      return data.data;
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async checkLogin({rootState, commit, dispatch}, {params, token, api}) {
    const {data} = await Service.getRequest(
      params,
      token,
      api,
      rootState.language.langCode
    );

    if (data.status === 200) {
      return data.data;
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getRequestDtails({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.getRequestDtails(
      params.id,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      return data.data;
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async downloadRequest({rootState, commit, dispatch}, {params, api}) {
    const response = await Service.downloadRequest(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );

    if (response?.status === 200) {
      const isJsonBlob = (data) =>
        data instanceof Blob && data.type === "application/json";
      const responseData = isJsonBlob(response?.data)
        ? await response?.data?.text()
        : response?.data || {};
      const responseJson =
        typeof responseData === "string"
          ? JSON.parse(responseData)
          : responseData;

      if (responseJson?.status === 201) {
        return Promise.reject({
          statusCode: responseJson?.status,
          message: responseJson?.message,
        });
      } else {
        return responseJson;
      }
    } else {
      return Promise.reject({
        statusCode: response?.status,
        message: response?.message,
      });
    }
  },
  async setRequest({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.setRequest(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    console.log(data);
    if (data.status === 200) {
      dispatch("ui/setToastMessage", data.message, {root: true});
      return data.data;
    } else if (data.status === 201) {
      dispatch("ui/setErrors", data.data, {root: true});
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async deleteParam({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.deleteParam(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      dispatch(
        "ui/setToastMessage",
        data?.message?.trim() === "" ? this.$i18n.t("util.del") : data?.message,
        {root: true}
      );
      return data.data;
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async deleteData({rootState, commit, dispatch}, {params, api}) {
    const {data} = await Service.deleteData(
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      dispatch(
        "ui/setToastMessage",
        data?.message?.trim() === "" ? this.$i18n.t("util.del") : data?.message,
        {root: true}
      );
      return data.data;
    } else if (data.status > 200) {
      dispatch(
        "ui/setToastError",
        data?.message?.trim() === "" ? this.$i18n.t("util.del") : data?.message,
        {root: true}
      );
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async deleteBank({rootState, commit, dispatch}, {id, params, api}) {
    const {data} = await Service.deleteBank(
      id,
      this.$auth.strategy.token.get(),
      params,
      api
    );
    if (data.status === 200) {
      dispatch(
        "ui/setToastMessage",
        data?.message?.trim() === "" ? this.$i18n.t("util.del") : data?.message,
        {root: true}
      );
      return data.data;
    } else if (data.status > 200) {
      dispatch(
        "ui/setToastError",
        data?.message?.trim() === "" ? this.$i18n.t("util.del") : data?.message,
        {root: true}
      );
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },

  async getById({rootState, commit, dispatch}, {id, params, api}) {
    const {data} = await Service.getById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api,
      rootState.language.langCode
    );
    if (data.status === 200) {
      return data.data;
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async setById(
    {rootState, commit, dispatch},
    {id, params, api, method = "post"}
  ) {
    dispatch("ui/setErrors", null, {root: true});
    let data; // Declare data variable outside the if-else block

    if (id > 0 && method === "put") {
      ({data} = await Service.putById(
        id,
        params,
        this.$auth.strategy.token.get(),
        api,
        rootState.language.langCode
      ));
    } else {
      ({data} = await Service.setById(
        id,
        params,
        this.$auth.strategy.token.get(),
        api,
        rootState.language.langCode
      ));
      return data
    }

    if (data.status === 200 && data.message != "") {
      dispatch("ui/setToastMessage", data.message, {root: true});
      return data.data;
    } else if (data.status === 201) {
      dispatch("ui/setErrors", data.data, {root: true});
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async setImageById({commit, dispatch}, {id, params, api}) {
    dispatch("ui/setErrors", null, {root: true});

    const {data} = await Service.setImageById(
      id,
      params,
      this.$auth.strategy.token.get(),
      api
    );
    if (data.status === 200) {
      dispatch("ui/setToastMessage", data.message, {root: true});
      return data.data;
    } else if (data.status === 201) {
      dispatch("ui/setErrors", data.data, {root: true});
    } else {
      return Promise.reject({statusCode: data.status, message: data.message});
    }
  },
  async swetAlertFire({}, {params}) {
    let status = false;
    await Swal.fire({
      title: params.title,
      text: params.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.$i18n.t("approvedModal.confirmBtn"),
      cancelButtonText: this.$i18n.t("approvedModal.cancel"),
      reverseButtons: true,
    }).then((result) => {
      console.log("result", result);
      if (result.value) {
        status = true;
      } else if (result.dismiss === "cancel") {
        status = false;
      }
    });
    return status;
  },
  async setAddressDefault({commit, dispatch}, params) {
    const {data} = await Service.setAddressDefault(params, this.$auth.strategy.token.get())
    if (data?.status === 200) {
      commit('common/SET_TOAST_MESSAGE', data?.message, {root: true})
      dispatch('userAddressAll')
    } else if (data?.status == 201) {
      commit('common/SET_TOAST_ERROR', data?.message, {root: true})
    } else {
      // alert('error')
    }
    return data.data
  },
};

export {state, getters, mutations, actions};
