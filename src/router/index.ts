//import { useQuizStore } from './../stores/quiz';
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'


// let store = useQuizStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizzView.vue')
        
    },
    {
      path: '/quizzies',
      name: 'quizzies',
      component: () => import('@/components/Quizzes.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/reviewquiz',
      name: 'reviewquiz',
      component: () => import('@/views/ReviewView.vue')
    },
    {
      path: '/newquiz',
      name: 'newquiz',
      component: () => import('@/views/NewQuizView.vue')
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('@/views/ReviewNew.vue')
    },
    {
      path: '/quizSearchView',
      name: 'quizsearchview',
      component: () => import('@/views/QuizSearchView.vue')
    }
  ]
})

export default router
