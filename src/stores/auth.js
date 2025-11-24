import { defineStore } from 'pinia'
import * as api from '../api'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null,
		user: null,
		error: null
	}),
	getters: {
		isAuthenticated: (state) => !!state.token
	},
	actions: {
		async login(payload) {
			this.error = null
			try {
			const res = await api.login(payload)
			// DummyJSON returns accessToken (or token) and user info
			this.token = res.accessToken || res.token
			this.user = { id: res.id, username: res.username, firstName: res.firstName, lastName: res.lastName }
				localStorage.setItem('pm_token', this.token)
				localStorage.setItem('pm_user', JSON.stringify(this.user))
				return res
			} catch (err) {
				this.error = err.message || 'Login failed'
				throw err
			}
		},
		logout() {
			this.token = null
			this.user = null
			localStorage.removeItem('pm_token')
			localStorage.removeItem('pm_user')
		},
		restoreSession() {
			const t = localStorage.getItem('pm_token')
			const u = localStorage.getItem('pm_user')
			if (t) this.token = t
			if (u) this.user = JSON.parse(u)
		}
	}
})
