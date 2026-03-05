# 3D Shop Pop 🎨

Loja virtual para venda de produtos impressos em 3D — brinquedos, miniaturas, chaveiros e mais.

**Live:** https://3d-shop-pop.vercel.app

## Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes + Prisma ORM
- **Database:** PostgreSQL (Neon/Vercel Postgres)
- **State:** Zustand (cart) + React Hook Form + Zod
- **Animations:** Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start Prisma dev server (local PostgreSQL)
npx prisma dev

# In another terminal, run migrations and seed
npx prisma migrate dev
npx prisma db seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

## Database Setup

### Local Development
Prisma 7 includes a local PostgreSQL dev server:
```bash
npx prisma dev  # Starts local Postgres on ports 51213-51215
```

### Production (Neon/Vercel Postgres)
1. Create a database at [Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres)
2. Add `DATABASE_URL` to your Vercel environment variables
3. Run migrations: `npx prisma migrate deploy`

## Project Structure

```
src/
  app/
    page.tsx                 — Home/Catalog
    product/[id]/page.tsx    — Product detail
    cart/page.tsx            — Shopping cart
    checkout/page.tsx        — Checkout form
    success/[orderId]/       — Order confirmation
    api/                     — API routes
  components/
    Header.tsx               — Navigation with cart count
    ProductCard.tsx          — Product grid item
    Footer.tsx               — Footer
  stores/
    cartStore.ts             — Zustand cart with localStorage
  lib/
    prisma.ts                — Prisma client
prisma/
  schema.prisma              — Database schema
  seed.ts                    — Seed data
  migrations/                — SQL migrations
```

## Features

- ✅ **Catalog:** Browse 3D printed products from database
- ✅ **Cart:** Add/remove items, quantity controls, persistent via localStorage
- ✅ **Checkout:** Customer info, pickup or shipping ($5 flat)
- ✅ **Orders:** Order creation with PENDING status
- ⏳ **Payments:** Stripe integration (coming soon)

## API Endpoints

- `GET /api/products` — List active products
- `GET /api/products/[id]` — Get product details
- `POST /api/orders` — Create new order
- `GET /api/orders/[id]` — Get order details

## Environment Variables

```env
# PostgreSQL connection (production)
DATABASE_URL="postgres://user:password@host:5432/database?sslmode=require"

# For local development with Prisma dev server
DATABASE_URL_TCP="postgres://postgres:postgres@localhost:51214/template1"
```

## Deploy

```bash
# Deploy to Vercel
npx vercel --prod
```

Make sure to:
1. Add `DATABASE_URL` environment variable in Vercel
2. Run `npx prisma migrate deploy` after first deploy

## License

Private project.
