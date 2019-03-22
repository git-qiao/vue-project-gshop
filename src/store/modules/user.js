/*
* user状态数据管理模块
* */
import {
  GET_USER,
  RESET_USER
} from '../mutation-types'

import { // 导入接口
  reqUser,
  logout
} from '../../api'

const state = {
  // user状态数据相关
  user: {}
}

const mutations = {
  // 登录成功设置user
  [GET_USER] (state, {user}) {
    state.user = user
  },
  // 退出登录清空user
  [RESET_USER] (state) {
    state.user = {}
  }
}

const actions = {
  // 操作用户信息状态数据部分的同步action
  saveUser ({commit}, user) {
    commit(GET_USER, {user})
  },

  // 根据会话获取用户信息的异步action
  async getUser ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const user = result.data
      commit(GET_USER, {user})
    }

  },

  // 退出登录清空user的异步action
  async resetUser ({commit}) {
    const result = await logout()
    commit(RESET_USER)
  }
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
