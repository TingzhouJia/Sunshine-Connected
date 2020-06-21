import Vue from 'vue'
import VueRouter, {  RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CourseList from '../views/courses/List.vue'
Vue.use(VueRouter)

  const routes:RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children:[
      {name:'home',path:'/',component:Home},
      {name:'course-lisg',path:'/course/list',component:CourseList}
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
