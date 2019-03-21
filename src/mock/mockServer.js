/*
* 使用mock库模拟请求后台数据模块
* */
import Mock from 'mockjs'
import json from './shop.json'

// 拦截Ajax请求 /goods 返回模拟后台返回的数据
Mock.mock('/goods', {code: 0, goods: json.goods})

// 拦截Ajax请求 /goods 返回模拟后台返回的数据
Mock.mock('/ratings', {code: 0, ratings: json.ratings})

// 拦截Ajax请求 /goods 返回模拟后台返回的数据
Mock.mock('/info', {code: 0, info: json.info})
