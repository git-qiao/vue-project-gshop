// 引入路由模块
// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'

// 路由组件懒加载  -- 按需加载
// import('模块') -- 这个模块会被单独打包
// 在注册路由时不会加载（请求获取）模块对应的打包文件，只有当请求对应路由路径才会请求加载
const Msite = () => import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'

import A from '../pages/Test/A.vue'
import B from '../pages/Test/B.vue'
import NotFound from '../pages/NotFound/NotFound'

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShow: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/login',
    component: Login
  },
  // 商家页面
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      },
    ]
  },
  // 测试导航守卫用的组件
  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B
  },
  // 404页面的配置
  // 上面的都匹配不到进入这个页面
  {
    path: '/*',
    component: NotFound
  }

]
