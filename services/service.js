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

// apiClient.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//
//   if(response.data.message) {
//     alert(response.data.message)
//     if (response.status == 200) {
//
//     }
//   }
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

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
}
