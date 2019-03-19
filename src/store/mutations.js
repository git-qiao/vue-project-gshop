/*
* 包含N个直接更改状态数据的方法的对象
* */
import { // 导入mutations方法常量
  GET_ADDRESS,
  GET_CATEGORIES,
  GET_SHOPS
} from './mutation-types'

export default {
  // 更改address状态数据
  [GET_ADDRESS] (state, {address}) {
    state.address = address.data
  },
  // 更改shops状态数据
  [GET_SHOPS] (state, {shops}) {
    state.shops = shops.data
  },
  [GET_CATEGORIES] (state, {categorys}) {
    state.categorys = categorys.data
  }
}
