/*
* shop状态数据管理模块
* */
import Vue from 'vue'

import {
  GET_INFO,
  GET_GOODS,
  GET_RATING,
  INCREMENT_CART,
  DECREMENT_CART,
  EMPTY_CART
} from '../mutation-types'

import {reqInfoMock, reqGoodsMock, reqRatingsMock} from '../../api'

const state = {
  // shop状态数据相关
  info: {},
  goods: [],
  ratings: [],
  // 购物车相关数据
  cartFoods: []
}

const mutations = {
  [GET_INFO] (state, {info}) {
    state.info = info
  },
  [GET_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [GET_RATING] (state, {ratings}) {
    state.ratings = ratings
  },
  [INCREMENT_CART] (state, {food}) {
    if (food.count) {
      food.count++
    } else {
      // 必须借助Vue.set给food添加属性，才能在界面生效
      // food.count = 1
      Vue.set(food, 'count', 1)

      // 只需要第一次添加进去即可
      state.cartFoods.push(food)
    }
  },
  [DECREMENT_CART] (state, {food}) {
    if (food.count>0){
      food.count--
      // 减为0时，删除即可
      if (food.count === 0) {
        const index = state.cartFoods.indexOf(food)
        state.cartFoods.splice(index, 1)
      }
    }
  },
  //清空购物车
  [EMPTY_CART] (state) {
    // 遍历购物车，将所有count删除
    if (state.cartFoods.length){
      state.cartFoods.forEach(food => {
        food.count = 0
      })
    }
    // 赋值为[]
    state.cartFoods = []
  }
}

const actions = {
  // 获取商户详情
  async getShopInfo ({commit}) {
    const result = await reqInfoMock()
    if (result.code === 0) {
      const info = result.data
      commit(GET_INFO, {info})
    }
  },

  // 获取商户商品
  async getShopGoods ({commit}, fn) {
    const result = await reqGoodsMock()
    if (result.code === 0) {
      const goods = result.data
      commit(GET_GOODS, {goods})
      // 手动执行回调fn，并且判断类型是函数时才执行
      typeof fn === 'function' && fn()
    }
  },

  // 获取商户评价
  async getShopRatings ({commit}) {
    const result = await reqRatingsMock()
    if (result.code === 0) {
      const rating = result.data
      commit(GET_RATING, {rating})
    }
  },

  // cartControl操作food的数量
  updateFoodCount ({commit}, {flag, food}) {
    if (flag) {
      commit(INCREMENT_CART, {food})
    } else {
      commit(DECREMENT_CART, {food})
    }
  },

  // 清空购物车
  emptyCart ({commit}) {
    commit(EMPTY_CART)
  }
}

const getters = {
  /* 模块里的getters属性会被挂载到store的getters，
  所以获取时不需要模块获取
  直接通过this.$store.getters(['xx']) */

  // 购物车的总数
  cartFoodsCount (state) {
    const {cartFoods} = state
    return cartFoods.reduce((pre,item) => {
      return pre+item.count
    }, 0)
  },
  // 总价
  cartFoodsPrice (state) {
    const {cartFoods} = state
    return cartFoods.reduce((pre,item) => {
      return pre+item.count*item.price
    }, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
