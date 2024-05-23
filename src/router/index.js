import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path: '/scan',
            name: 'scan',
            component: () => import('@/views/ScanView.vue'),
        },
        {
            path: '/guide',
            name: 'guide',
            component: () => import('@/views/GuideView.vue'),
        },
        {
            path: '/results/:uuid',
            name: 'result',
            component: () => import('@/views/ResultsView.vue'),
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('@/views/HistoryView.vue'),

        },
        {
            path: '/terms-and-conditions',
            name: 'terms-and-conditions',
            component: () => import('@/views/TermsAndConditions.vue'),

        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        }
    ]
})

export default router
