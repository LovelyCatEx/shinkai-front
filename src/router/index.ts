import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainContainerView from "@/views/MainContainerView.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import GalleryView from "@/views/GalleryView.vue";
import CreationsView from "@/views/CreationsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'page-not-found', component: PageNotFound },
    {
      path: '/',
      name: 'home',
      component: MainContainerView,
      children: [
        { path: '', name: 'main-home', component: HomeView },
        { path: 'creations', name: 'main-creations', component: CreationsView },
        { path: 'gallery', name: 'main-gallery', component: GalleryView }
      ]
    }
  ]
})

export default router
