# Product Management App (Vue 3 + Vite)

A single-page Product Management application built with Vue 3, Pinia, Vue Router, and TailwindCSS. 

## 🚀 Live Demo

[Deployed Site](https://vivnjoroge.github.io/Product-Management-App/)

---

## Features
- Login (token saved to localStorage)
- Product listing with search and filters
- View product details
- Add, edit, and delete products
- Pinia stores for authentication and products
- Route guards for protected pages
- Responsive, modern UI (TailwindCSS)

## Tech Stack
- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- DummyJSON public API

---

## Setup Steps

1. **Install dependencies**
	```bash
	npm install
	```
2. **Run development server**
	```bash
	npm run dev
	```
3. **Open the app**
	- Visit [http://localhost:5173](http://localhost:5173) (or the address shown by Vite)

### Build & Deploy

1. **Build for production**
	```bash
	npm run build
	```
2. **Deploy**
	- Deploy the `dist` folder to GitHub Pages or any static host.
	- For GitHub Pages, use a workflow to copy `dist` to the `gh-pages` branch.

---

## Environment / Config
- No environment variables required for local development.
- Uses DummyJSON public API for authentication and product CRUD.
- Auth token is stored in `localStorage` under the key `pm_token`.
- Sample credentials (for DummyJSON):
  - Username: `emilys`
  - Password: `emilyspass`
  - See [DummyJSON Auth Docs](https://dummyjson.com/docs/auth)

---

## Project Structure
```
Product-Management-App/
├── public/           # Static assets (logo, etc.)
├── src/
│   ├── api/          # API helpers for DummyJSON
│   ├── components/   # UI building blocks (Sidebar, ConfirmModal, etc.)
│   ├── pages/        # Route pages (Login, Products, AddProduct, ProductView)
│   ├── stores/       # Pinia stores (auth, products)
│   ├── router/       # Vue Router setup and guards
│   └── style.css     # TailwindCSS entry
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Assumptions & Notes
- The app is designed for demonstration and learning purposes.
- Product CRUD operations use DummyJSON, so changes are not persisted across sessions.
- UI is optimized for desktop and mobile (responsive).
- Authentication is required for all pages except login.
- Route guards redirect unauthenticated users to the login page.
- The deployed site uses GitHub Pages; routing is configured for hash mode to support static hosting.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


