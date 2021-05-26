import axios from '../utils/api.request.js'

export const homeList = (data) => {
  return axios.request({
    url: `home/list`,
    method: 'post',
    data
  })
}

export const homeImg = (data) => {
  return axios.request({
    url: `home/imgList`,
    method: 'post',
    data
  })
}
