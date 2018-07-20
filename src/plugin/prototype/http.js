/**
 * 命名规则
 * get[Name] => 获取详情
 * fetch[Name] => 获取列表
 * save[Name] => 保存信息，传id为编辑保存，更新数据，不传为新增数据
 * del[Name] => 删除信息，传ids，对象数组列表
 */
import axios from '~libs/axios'
export default {
  getShop (params) {
    return axios.post('', params)
  },
  saveShop (params) {
    return axios.post('', params)
  },
  fetchShop (params) {
    return axios.post('', params)
  },
  delShop (ids) {
    return axios.post('', ids)
  }
}
