# Product-Management-App
Mini Product Management App (AlienSoft Technologies Evaluation)

Project Overview
This project is a Single Page Application (SPA) built as an evaluation exercise for AlienSoft Technologies. It serves as a mini Product Management dashboard, demonstrating proficiency in modern frontend development practices, state management, and API integration.The application allows users to authenticate, browse a catalog of products, search and filter the list, and perform CRUD operations (Create, Read, Delete) against a public API.

🛠️ Tech Stack & Core Libraries
Category   Technology    PurposeFramework                              Vue 3 (Composition API)Core application developmentState ManagementPiniaGlobal state for Authentication and ProductsStylingTailwind CSSUtility-first styling for responsiveness and designRoutingVue RouterClient-side routing for the SPAAPIDummyJSONBackend services for Auth and ProductsHTTP Clientaxios (or fetch)Handling API requests

🚀 Setup & Installation
Follow these steps to get the application running on your local machine.Prerequisites
1.Node.js (LTS recommended)
2.npm (or yarn/pnpm)
Step-by-Step GuideClone the Repository:Bashgit clone [YOUR_REPOSITORY_LINK]
cd mini-product-manager
Install Dependencies:Bashnpm install
# or
yarn install
Run the Development Server:Bashnpm run dev
# or
yarn dev
The application will be available at http://localhost:5173/ (or the port specified by your Vite/Vue CLI setup).

🏗️ Structure and Architecture
The project follows a standard modular Vue structure, emphasizing separation of concerns:
src/stores: Contains all Pinia modules (auth.js and products.js). This is the central hub for state logic, API calls, and data transformation.src/views: 
Contains the top-level components mapped directly to the Vue Router paths (e.g., LoginView.vue, ProductsListView.vue).
src/components: Houses reusable UI components (e.g., ProductTable.vue, SearchFilter.vue, BaseButton.vue).
src/router: Includes the index.js file defining all routes and the crucial Global Navigation Guards for route protection.

Key AssumptionsSession
 Persistence: The user authentication token is persisted in localStorage using the Pinia restoreSession action to maintain the session across page refreshes.
Styling Implementation: Tailwind CSS utility classes were used throughout. The primary color #000080 (Navy Blue) was defined and applied to key interactive elements (buttons, links).
Filtering Scope: Initial product filtering/search is performed client-side on the data retrieved by fetchProducts(), as the DummyJSON API has limited server-side filtering capabilities.

✨ Implemented Features
✅ User Authentication: Login using DummyJSON credentials (kminchelle, 0lelplR) with token storage and session persistence.
✅ Route Protection: Non-authenticated users are restricted to /login. Logged-in users are redirected away from /login.
✅ Product Listing: Display of products in a clean, responsive table with essential data (Thumbnail, Title, Description snippet, Price, Stock).
✅ Search & Filter: Reactive client-side search by product title.✅ Product Creation: Dedicated /products/new page for adding new products via the API.
✅ View & Delete Product: Dedicated view page with full details and a functional delete action (with confirmation).
✅ State Management: All application data flows through the centralized Pinia stores.
✅ UX: Implementation of basic loading states and clear error messages for API failures.

🔗 Live Demo
The application is hosted via GitHub Pages and can be accessed here:[INSERT GITHUB PAGES LINK HERE]