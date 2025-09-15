# 🛒 ECommerce App

A full-featured Angular ECommerce Web Application that allows users to browse products, manage their shopping cart and wishlist, place orders, and make secure payments.
The project was built from scratch and applies a wide range of Angular concepts to deliver a scalable, modern, and user-friendly solution.

---

## 🚀 Features

- **User Authentication**
  - Sign up for a new account
  - Sign in with existing credentials
  - Protected routes using Angular guards
  - Dynamic routing for product details, brands, and categories
  - Demo account for quick testing (see below 👇)

- **Products & Browsing**
  - 🛍 Product listing and detailed product pages
  - 🔎 Search functionality with filtering and sorting
  - 🏷 Brand and category-based navigation

- **Shopping Experience**
  - 🛒 Add to Cart with real-time updates (BehaviorSubject)
  - ❤️ Add to Wishlist
  - 📦 Place and view Orders

- **Payments**
  - 💳 Integrated Visa payments using Stripe API

- **UI & Navigation**
  - Two different layouts with a shared Navbar:
    - **Before Login** → shows Register and Login options
    - **After Login** → shows Products, Cart, Orders, Categories, Brands Wishlist and Sign Out
  - Success and error alerts for all major actions
  - Applied Translate concept (for static data only, not API-based)
  - Responsive layout styled with Flowbite & Tailwind CSS
    
- **Core Angular Concepts**
  - ⚡ **Signals & BehaviorSubject** → state management
  - 🛠 **Services** → for handling authentication, API communication, and shared logic
  - 🌐 **APIs** → all CRUD operations are connected to backend APIs
  - 🛡 **Interceptor** → add headers (JWT) & handle global errors
  - 🔐 **Guards** → secure routes and authentication logic
---

## 🧑‍💻 Demo Account

You can try the app without creating a new account.  
Use the following credentials on the login page:

- **Username:** `testt2@gmail.com`  
- **Password:** `Test123`  
