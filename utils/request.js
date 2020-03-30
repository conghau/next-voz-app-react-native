import axios from 'axios'

const configs = {
  // baseURL: `http://localhost:5000/api`,
  baseURL: __DEV__ ? `http://192.168.1.83:5000/api` : `http://192.168.1.83:5000/api`,
  timeout: 100000,
}


export const requestWithAuth = () => {

  const axiosInstance = axios.create({
    ...configs,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        // removeAuth()
        // localStorage.clear();
        // window.location.reload()
        return null
      }

      return Promise.reject(error)
    }
  )
  return axiosInstance
}


export const buildQueryString = (params, isSkipUndefined = true) => {
  if (!params) {
    return ''
  }
  const esc = encodeURIComponent

  const build = (k, val) => {
    if (isArray(val)) {
      return val.map(v => `${esc(k)}=${esc(v)}`).join('&')
    }
    return `${esc(k)}=${esc(val)}`
  }

  return Object.keys(params)
    .map(k => {
      if (isSkipUndefined) {
        return typeof params[k] !== 'undefined' ? build(k, params[k]) : ''
      }
      return build(k, params[k])
    })
    .join('&')
}


export default axios.create(configs)
