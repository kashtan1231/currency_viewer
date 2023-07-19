import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'DefaultLayout',
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'date-currencies',
        name: 'DateCurrencyPage',
        component: () => import('@/views/DateCurrencyPage.vue')
      },
      {
        path: 'changed-currencies',
        name: 'ChangedCurrencyPage',
        component: () => import('@/views/ChangedCurrencyPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
