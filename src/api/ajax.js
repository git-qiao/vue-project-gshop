/*
* 用来发送Ajax请求的函数模块
* 函数的返回值是promise
* 包装axios
* 自己封装了promise
*   1.希望异步得到的是response中的data数据
*   2.统一处理错误信息
* */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  // 手动处理返回一个对axios的promise的resolve参数为response.data的promise对象
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {params: data})
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    }
    promise
      .then(response => {
        // 成功时，直接返回response.data
        resolve(response.data)
      })
      .catch(err => {
        // 不执行reject  直接统一处理
        alert('出错了'+err.message)
      })
  })

}
