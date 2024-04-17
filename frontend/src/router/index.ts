import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginForm.vue';
import Dashboard from '../components/DashboardPage.vue';
import ProductDetailsPage from '../components/ProductDetailsPage.vue';
import ProductRegistration from '../components/ProductRegistration.vue';



const routes = [
  { path: '/', name: 'Login', component: Login, props: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, props: true },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage
  },
  { path: '/product-registration', name: 'ProductRegistration', component: ProductRegistration, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
