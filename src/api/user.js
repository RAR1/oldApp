import axios from '@/utils/api.request.js'

export const userLogin = ( data ) => {
  return axios.request({
    url: `user/login`,
    method: 'post',
    data
  })
}

export const userReigster = ( data ) => {
  return axios.request({
    url: `user/register`,
    method: 'post',
    data
  })
}

export const userLogout = ( data ) => {
  return axios.request({
    url: 'user/logout',
    method: 'post',
    data
  })
}
