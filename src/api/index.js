const BASE = 'https://dummyjson.com'

async function request(path, options = {}) {
  const url = `${BASE}${path}`
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok) {
    const err = new Error(data.message || 'API error')
    err.response = data
    throw err
  }
  return data
}

export async function login({ username, password }) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ username, password })
  })
}

export async function fetchProducts({ limit = 30, skip = 0, q = '', filters = {} } = {}) {
  let url = `/products?limit=${limit}&skip=${skip}`
  if (q) url += `&q=${encodeURIComponent(q)}`
  const res = await request(url)
  // Filtering client-side for category/price range because dummyjson supports limited query params
  let products = res.products || []
  if (filters.category) {
    products = products.filter(p => p.category === filters.category)
  }
  if (filters.minPrice != null) {
    products = products.filter(p => p.price >= filters.minPrice)
  }
  if (filters.maxPrice != null) {
    products = products.filter(p => p.price <= filters.maxPrice)
  }
  return { products, total: res.total }
}

export async function fetchProductById(id) {
  return request(`/products/${id}`)
}

export async function addProduct(payload, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return request('/products/add', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
}

export async function updateProduct(id, payload, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return request(`/products/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload)
  })
}

export async function deleteProduct(id, token) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  return request(`/products/${id}`, { method: 'DELETE', headers })
}

export default { login, fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct }
