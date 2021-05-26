import axios from '@/utils/api.request.js'

export const updatePassword = ( data ) => {
  return axios.request({
    url: 'set/changePassword',
    method: 'post',
    data
  })
}
