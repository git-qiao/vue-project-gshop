/*
* 包含N个直接更改状态数据的方法的对象
* */
import { // 导入mutations方法常量
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS,
  GET_USER,
  RESET_USER
} from './mutation-types'

export default {
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
  },
  // 登录成功设置user
  [GET_USER] (state, user) {
    state.user = user
  },
  // 退出登录清空user
  [RESET_USER] (state) {
    state.user = {}
  }
}
