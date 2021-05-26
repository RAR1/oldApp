import axios from 'axios'
import Qs from 'qs'
import history from '@/utils/history'
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if(config.method == 'post' || config.method == 'put' || config.method == 'patch' || config.method == 'delete'){
        if(!config.upload) {
          config.data = Qs.stringify(config.data)
        }
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (data.error == 2) {
        history.push('/')
      }
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        console.log(errorInfo);
        // const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        // errorInfo = {
        //   statusText,
        //   status,
        //   request: { responseURL: config.url }
        // }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    console.log(options);
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
