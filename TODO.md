# TODO — 3D Shop Pop

## Fase 1: Setup ✅
- [x] Criar projeto Next.js + TypeScript + Tailwind
- [x] Setup Prisma + schema inicial
- [ ] Setup PostgreSQL (Vercel Postgres ou Supabase)
- [ ] Configurar Stripe (test mode)
- [ ] Deploy inicial no Vercel
- [x] Repo git em /Users/admin/www/3d-shop-pop

## Fase 2: Core Loja
- [ ] Model Product + seed com mocks
- [ ] API: GET /api/products (lista ativos)
- [ ] API: GET /api/products/[id] (detalhe)
- [ ] Página catálogo (grid de produtos)
- [ ] Componente ProductCard
- [ ] Página de produto individual
- [ ] Carrinho (Zustand store + localStorage)
- [ ] Componentes CartItem, CartSummary
- [ ] Página /cart
- [ ] Checkout UI (form com React Hook Form + Zod)
- [ ] API: POST /api/checkout (criar Stripe session)
- [ ] Integração Stripe Checkout
- [ ] API: POST /api/webhook/stripe (processar pagamento)
- [ ] Página /success (confirmação)

## Fase 3: Admin
- [ ] Auth admin simples (senha no env)
- [ ] Middleware proteção /admin/*
- [ ] Login page /admin/login
- [ ] Dashboard /admin
- [ ] API: POST /api/products (criar)
- [ ] API: PUT /api/products/[id] (atualizar)
- [ ] API: DELETE /api/products/[id] (deletar)
- [ ] CRUD produtos UI
- [ ] Upload de imagens (Cloudinary ou Vercel Blob)
- [ ] API: GET /api/orders (lista pedidos)
- [ ] Lista de pedidos UI

## Fase 4: Polish
- [ ] Email de confirmação (Resend)
- [ ] Mobile responsive polish
- [ ] Loading states (skeletons)
- [ ] Error states
- [ ] Empty states
- [ ] SEO básico (meta tags, OG)
- [ ] Favicon + branding
- [ ] Testes manuais completos
- [ ] Review com Catarina (usabilidade admin)

## Backlog (pós-MVP)
- [ ] Sistema de cupons/descontos
- [ ] Múltiplas variantes por produto
- [ ] Controle de estoque
- [ ] Reviews/avaliações
- [ ] Login clientes (opcional)
- [ ] Domínio próprio 3dshoppop.com
- [ ] Analytics (Vercel Analytics)
