# 3D Shop Pop 🎨

Loja virtual para venda de produtos impressos em 3D — brinquedos, miniaturas, chaveiros e mais.

## Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL via Prisma ORM
- **Payments:** Stripe (Checkout, Apple Pay, Google Pay)
- **State:** Zustand (cart) + React Hook Form + Zod
- **Animations:** Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your values

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

## Project Structure

```
src/
  app/
    page.tsx                 — Home/Catalog
    product/[id]/page.tsx    — Product detail
    cart/page.tsx            — Shopping cart
    checkout/page.tsx        — Checkout
    success/page.tsx         — Order confirmation
    admin/                   — Admin panel
  components/
    ui/                      — Reusable UI components
    features/                — Feature-specific components
  lib/
    cart.ts                  — Zustand cart store
    prisma.ts                — Prisma client
```

## Features

- **Catalog:** Browse 3D printed products
- **Cart:** Add/remove items, persistent via localStorage
- **Checkout:** Guest checkout with Stripe
- **Shipping:** Pickup or flat-rate shipping
- **Admin:** Simple product management (password-protected)

## Environment Variables

See `.env.example` for required variables.

## License

Private project.
