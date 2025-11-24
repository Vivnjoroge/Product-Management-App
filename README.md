# AlienSoft — Product Management App (Vue 3 + Vite)

This repository contains a small Product Management single-page application built with Vue 3 (Composition API), Pinia for state management, Vue Router, and TailwindCSS.

Purpose: 

Primary color: #000080

Features
- Login (token saved to localStorage)
- Product listing with search and simple filters
- View product details
- Add new product
- Pinia stores for auth and products

Tech stack
- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- Tailwind CSS

Local setup

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open the app

Visit http://localhost:5173 (or the address shown by Vite)

Notes
- DummyJSON sample credentials (used in the login form placeholder): username `emilys`, password `emilyspass` — see https://dummyjson.com/docs/auth
- The app stores the auth token in `localStorage` under the key `pm_token`.

Deployment (GitHub Pages)

1. Build the app:

```bash
npm run build
```

2. Deploy the `dist` folder to GitHub Pages (use `gh-pages` action or a static host). For GitHub Pages you can create a workflow that copies `dist` to the `gh-pages` branch.

Project structure

- `src/` — source files
	- `pages/` — route pages (Login, Products, AddProduct, ProductView)
	- `components/` — UI building blocks
	- `stores/` — Pinia stores (auth, products)
	- `api/` — API helpers for DummyJSON
	- `router/` — Vue Router setup and guards


