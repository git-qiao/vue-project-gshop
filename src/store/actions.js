/*
* 包含N个间接更改状态数据的方法的对象
* */
import { // 导入接口
  reqLocation,
  reqCategorys,
  reqShops,
  reqUser,
  logout
} from '../api'

import { // 导入mutations方法常量
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
  GET_USER,
  RESET_USER
} from './mutation-types'

export default {
  // 获取地址部分
  async getAddress ({commit, state}) {
    // 获取经纬度后续使用
    const {longitude, latitude} = state
    // 发送请求
    const result = await reqLocation(longitude, latitude)
    if (result.code===0) {
      const address = result.data
      // 调用commit触发mutation
      commit(GET_ADDRESS, {address})
    }
  },

  // 获取入口部分
  async getCategorys ({commit, state}) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(GET_CATEGORIES, {categorys})
    }
  },

  // 获取商家列表部分
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(GET_SHOPS, {shops})
    }
  },

  // 操作用户信息状态数据部分的同步action
  saveUser ({commit}, user) {
    commit(GET_USER, user)
  },

  // 根据会话获取用户信息的异步action
  async getUser ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      commit(GET_USER, result.data)
    }

  },

  // 退出登录清空user的异步action
  async resetUser ({commit}) {
    const result = await logout()
    commit(RESET_USER)
  }
}
