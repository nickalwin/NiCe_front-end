import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ScanView from "@/views/ScanView.vue";
import GuideView from "@/views/GuideView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/scan',
            name: 'scan',
            component: ScanView,
            props: route => ({
                sector: route.query.sector,
                name: route.query.name,
                email: route.query.email
              })
        },
        {
            path: '/guide',
            name: 'guide',
            component: GuideView
        }
    ]
})

export default router
