import axios from 'axios'
import json from '~/jsconfig.json'

const apiBase = !process.env.apiBase.trim() ? window.location.origin + '/' : process.env.apiBase

const apiClient = axios.create({
  baseURL: apiBase + json.api.url,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


export default {
  convertImage(params, bearer) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(`${json.api.convertImage}/${params}`)
  },

  deleteParam(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }

    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.delete(`${json.api[api]}`, {data: params})
  },
  deleteData(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }

    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.delete(`${json.api[api]}/${params}`)
  },
  setImageById(id = '', params, bearer, api) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.post(`${json.api[api]}${id ? '/' + id : ''}`, params)
  },
  setById(id, params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.post(`${json.api[api]}${id ? '/' + id : ''}`, params)
  },
  putById(id, params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.put(`${json.api[api]}${id ? '/' + id : ''}`, params)
  },
  getById(id, params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(`${json.api[api]}${id ? '/' + id : ''}`, {params: params})
  },
  getRequest(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(json.api[api], {params: params})
  },

  getRequestDtails(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(json.api[api] +'/'+ params )
  },
  getMyVideo(bearer, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(json.api.getVideo)
  },



  setRequest(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }

    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.post(json.api[api], params)
  },


  userAddressAction(params, bearer) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.post(json.api.userAddressAction, params)
  },

  userAddressDelete(id, bearer, params = null) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.delete(`${json.api.userAddressDelete}/${id}`, {params: params})
  },

  deleteBank(id, bearer, params = null, api) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.delete(`${json.api[api]}/${id}`, {params: params})
  },

  userAddressUpdate(id, bearer, params = null) {
    apiClient.defaults.headers.common['Authorization'] = bearer
    return apiClient.get(`${json.api.userAddressFind}/${id}`, {params: params})
  },


  phoneCode(lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }

    return apiClient.get(`${json.api.phoneCode}`)
  },

  async downloadRequest(params, bearer, api, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }

    apiClient.defaults.headers.common['Authorization'] = bearer

    const res = await apiClient.get(json.api[api], {params: params, responseType: 'blob'})

    const contentDispositionHeader = res?.headers['content-disposition'];

    const regex = /filename=([^;]+)/;
    const matches = regex.exec(contentDispositionHeader);

    // Check if the filename was found in the header
    if (matches && matches.length > 1) {
      const filename = matches[1];


      // Create a blob URL for the Excel data
      const blob = new Blob([res?.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element and trigger a download with the extracted filename
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Use the extracted filename
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the blob URL
      window.URL.revokeObjectURL(url);


    }


    return res
  },

//   get Order
  async getData(bearer,page = 0, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(`${json.api.subOrder}?page=`+page)
    return response;
  },
  async getDataPending(bearer,page = 0, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(`${json.api.subOrderPending}?page=`+page)
    return response;
  },
  async getDataOrderApproved(bearer,page = 0, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(`${json.api.subOrderApproved}?page=`+page)
    return response;
  },
  async getDataOrderRejected(bearer,page = 0, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(`${json.api.subOrderRejected}?page=`+page)
    return response;
  },
  async getOrderDetails(id, bearer, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(`${json.api.subOrder}/${id}`);
    return response;
  },
  async getReasonsRejection(bearer, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(json.api.reasonsRejection);
    return response;
  },
//   getVendorAddress
  async getVendorAddress(bearer, lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.get(json.api.getVendorAddress);
    return response;
  },
//   changeStatusOrder
  async changeStatusOrder(bearer, params,lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.post(json.api.changeStatusOrder,params)
    return response;
  },
  // subOrderReject
  async subOrderReject(bearer, params,lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.post(`${json.api.subOrderReject}/${params.order_id}`,params)
    return response;
  },
  //approve Order
  async approveOrder(bearer, params,lang = null) {
    if (lang) {
      apiClient.defaults.headers.common['Language'] = lang
    }
    apiClient.defaults.headers.common['Authorization'] = bearer
    const response = await apiClient.post(`${json.api.SubOrderApprove}/${params.order_id}`,params)
    return response;
  },
}
