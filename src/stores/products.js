import { defineStore } from 'pinia'
import * as api from '../api'
import { useAuthStore } from './auth'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
    total: 0
  }),
  actions: {
    async fetchProducts({ q = '', filters = {} } = {}) {
      this.isLoading = true
      this.error = null
      try {
        const res = await api.fetchProducts({ q, filters })
        this.products = res.products
        this.total = res.total || this.products.length
      } catch (err) {
        this.error = err.message || 'Failed to load products'
      } finally {
        this.isLoading = false
      }
    },
    async fetchProductById(id) {
      this.isLoading = true
      this.error = null
      try {
        const res = await api.fetchProductById(id)
        return res
      } catch (err) {
        this.error = err.message || 'Failed to load product'
        throw err
      } finally {
        this.isLoading = false
      }
    },
    async addProduct(payload) {
      this.isLoading = true
      this.error = null
      const auth = useAuthStore()
      try {
        const res = await api.addProduct(payload, auth.token)
        // push to local state
        this.products.unshift(res)
        this.total += 1
        return res
      } catch (err) {
        this.error = err.message || 'Failed to add product'
        throw err
      } finally {
        this.isLoading = false
      }
    },
    async updateProduct(id, payload) {
      this.isLoading = true
      this.error = null
      const auth = useAuthStore()
      try {
        const res = await api.updateProduct(id, payload, auth.token)
        // update local list
        const idx = this.products.findIndex(p => p.id === res.id)
        if (idx !== -1) this.products.splice(idx, 1, res)
        return res
      } catch (err) {
        this.error = err.message || 'Failed to update product'
        throw err
      } finally {
        this.isLoading = false
      }
    },
    async deleteProduct(id) {
      this.isLoading = true
      this.error = null
      const auth = useAuthStore()
      try {
        await api.deleteProduct(id, auth.token)
        this.products = this.products.filter(p => p.id !== Number(id) && p.id !== id)
        this.total = Math.max(0, this.total - 1)
      } catch (err) {
        this.error = err.message || 'Failed to delete product'
        throw err
      } finally {
        this.isLoading = false
      }
    }
  }
})
