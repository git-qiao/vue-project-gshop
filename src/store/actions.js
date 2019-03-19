/*
* 包含N个间接更改状态数据的方法的对象
* */
import { // 导入接口
  reqLocation,
  reqCategorys,
  reqShops
} from '../api'

import { // 导入mutations方法常量
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS
} from './mutation-types'

export default {
  // 获取地址部分
  async getAddress ({commit, state}) {
    // 获取经纬度后续使用
    const {longitude, latitude} = state
    // 发送请求
    const address = await reqLocation(longitude, latitude)
    // 调用commit触发mutation
    commit(GET_ADDRESS, {address})
  },

  // 获取入口部分
  async getCategorys ({commit, state}) {
    const categorys = await reqCategorys()
    commit(GET_CATEGORIES, {categorys})
  },
  // 获取商家列表部分
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const shops = await reqShops(longitude, latitude)

    commit(GET_SHOPS, {shops})
  }
}
