import Vue from 'vue'
import VueRouter, {  RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
// import CourseList from '../views/courses/CourseList.vue'
// import CourseEdit from '../views/courses/CourseEdit.vue'
import CourseCrud from '../views/ResourceCrud.vue'
Vue.use(VueRouter)

  const routes:RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children:[
      {name:'home',path:'/',component:Home},
      {name:'course-curd',path:'/:resource/crud',component:CourseCrud,props:true},
      // {name:'course-list',path:'/course/list',component:CourseList},
      // {name:'course-edit',path:'/course/edit/:id',component:CourseEdit,props:true},
      // {name:'course-create',path:'/course/create',component:CourseEdit},
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
