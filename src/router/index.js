import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Recommend = () => import('@/views/recommend/recommend')
const Singer = () => import('@/views/singer/singer')
const Detail = () => import('@/views/detail/Detail')
const Profile = () => import('@/views/profile/profile')
const Album = () => import('@/views/album/album')
const DJ = () => import('@/views/dj/dj')
const DJDetail = () => import('@/views/djDetail/djDetail')
const Official = () => import('@/views/official/official')
const Singing = () => import('@/views/singing/singing')
const My = () => import('@/views/my/my')
const Search = () => import('@/views/search/search')
const Video = () => import('@/views/video/video')

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/recommend'
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singer',
        component: Singer
      },
      {
        path: '/detail',
        component: Detail
      },
      {
        path: '/profile',
        component: Profile
      },
      {
        path: '/album',
        component: Album
      },
      {
        path: '/dj',
        component: DJ
      },
      {
        path: '/djDetail',
        component: DJDetail
      },
      {
        path: '/official',
        component: Official
      },
      {
        path: '/singing',
        component: Singing
      },
      {
        path: '/my',
        component: My
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/video',
        component: Video
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
