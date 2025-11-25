import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const Login = () => import('../pages/Login.vue')
const Products = () => import('../pages/Products.vue')
const ProductView = () => import('../pages/ProductView.vue')
const AddProduct = () => import('../pages/AddProduct.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/products', name: 'Products', component: Products, meta: { requiresAuth: true } },
  { path: '/products/new', name: 'AddProduct', component: AddProduct, meta: { requiresAuth: true } },
  { path: '/products/:id', name: 'ProductView', component: ProductView, meta: { requiresAuth: true }, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  // restore session from localStorage if needed
  if (!auth.token) {
    auth.restoreSession()
  }

  const requiresAuth = to.meta.requiresAuth === true
  if (requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login' })
  }
  if (to.name === 'Login' && auth.isAuthenticated) {
    return next({ name: 'Products' })
  }
  return next()
})

export default router
