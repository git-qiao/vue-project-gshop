/*
* msite状态数据管理模块
* */
import { // 导入mutations方法常量
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
} from '../mutation-types'

import { // 导入接口
  reqLocation,
  reqCategorys,
  reqShops
} from '../../api'

const state = {
  // Msite状态数据相关
  longitude: '116.36867',
  latitude: '40.10038',
  address: {},
  categorys: [],
  shops: []
}

const mutations = {
  // 更改address状态数据
  [GET_ADDRESS] (state, {address}) {
    state.address = address
  },
  // 更改shops状态数据
  [GET_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  // 更改categories入口状态数据
  [GET_CATEGORIES] (state, {categorys}) {
    state.categorys = categorys
  }
}

const actions = {
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
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
