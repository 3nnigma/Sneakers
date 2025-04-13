
# Sneakers Shop

Sneakers Shop is a modern and responsive e-commerce web application for browsing, managing, and purchasing sneakers online. Built with a clean architecture and cutting-edge technologies, it delivers a fast, smooth, and secure shopping experience.

## Key Features

- Product listing with filtering and sorting
- Shopping cart and checkout flow
- Stripe integration for secure payments
- User authentication (JWT-based)
- Admin panel for product and order management
- Order history and tracking for customers
- Responsive animations and transitions

![presentation](https://github.com/3nnigma/Sneakers/blob/master/presentation.png)

## Tech Stack

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - shadcn/ui
  - Zustand (state management)
  - TanStack Query (data fetching)
  - Framer Motion (animations)
- **Backend:**
  - Django REST Framework
  - PostgreSQL
  - Docker & Docker Compose

## Screenshots

### Home Page
![Home Page](https://github.com/yourusername/SneakersShop/blob/main/presentation/home.png)
Showcases featured products, collections, and categories with animated transitions and a clean layout.

### Product Page
![Product Page](https://github.com/yourusername/SneakersShop/blob/main/presentation/product.png)
Provides detailed information about individual sneakers, including available sizes, images, and an add-to-cart option.

### Checkout Page
![Checkout Page](https://github.com/yourusername/SneakersShop/blob/main/presentation/checkout.png)
Secure checkout flow with Stripe integration, including order summary and payment confirmation.

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker & Docker Compose
- Python (v3.9+)
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SneakersShop.git
   cd SneakersShop
   ```
2. Create environment variables:
   ```env
   # .env
   DATABASE_URL=postgres://user:password@db:5432/sneakers
   STRIPE_SECRET_KEY=your_stripe_secret
   JWT_SECRET_KEY=your_jwt_secret
   ```
3. Start services:
   ```bash
   docker-compose up --build
   ```
4. Open `http://localhost:3000` in your browser.

## Folder Structure

```
/frontend   # Next.js storefront
/backend    # Django REST API
/docker     # Docker configurations
```

## Deployment

Docker-based deployment is supported. Configure environment variables and use Docker Compose for production-ready builds.
