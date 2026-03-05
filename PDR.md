# PDR — 3D Shop Pop

**Data:** 2026-03-05
**Status:** Em Revisão
**Cliente:** Marcelo Melo (ideia: Catarina, 7 anos)
**PM:** Pedro

---

## 1. Resumo Executivo

Loja virtual para a Catarina vender produtos 3D (brinquedos, miniaturas, chaveiros) para colegas de escola e conhecidos. O site terá catálogo de produtos, carrinho, checkout com Stripe, e um painel admin simples para a Catarina gerenciar seus produtos.

Começamos com subdomínio gratuito (3dshoppop.vercel.app) e migramos para domínio próprio depois se fizer sentido.

## 2. Objetivo

- **O que resolve:** Permitir que a Catarina divulgue e venda seus produtos 3D online
- **Para quem:** Colegas de escola, amigos, família, conhecidos em Orlando e EUA
- **Métricas de sucesso:** Site funcionando, Catarina conseguindo adicionar produtos sozinha, primeira venda processada

## 3. Escopo

### Incluso (MVP)
- Página inicial com catálogo de produtos
- Página de produto individual
- Carrinho de compras
- Checkout com Stripe (cartão, Apple Pay, Google Pay)
- Opções de entrega: pickup (escola/presencial) ou shipping (USPS/UPS)
- Cálculo de frete simples (flat rate por zona)
- Painel admin para Catarina gerenciar produtos (CRUD)
- Upload de fotos de produtos
- Página de confirmação de pedido
- Notificação por email de novos pedidos

### Fora do Escopo (v1)
- Sistema de contas/login para clientes (guest checkout only)
- Rastreamento de envio integrado
- Sistema de cupons/descontos
- Reviews/avaliações
- Múltiplas variantes por produto (cor, tamanho)
- Estoque automático (controle manual)
- Domínio próprio (fase futura)

## 4. Design & UX (Marina)

### Fluxos Principais

**Fluxo 1: Compra**
```
Home → Catálogo → Produto → Add to Cart → Cart → Checkout → Pagamento → Confirmação
```

**Fluxo 2: Admin (Catarina)**
```
Login Admin → Dashboard → Produtos → Add/Edit/Delete → Upload Foto → Salvar
```

### Wireframes

**Home/Catálogo**
```
┌─────────────────────────────────┐
│  🎨 3D SHOP POP                 │
│  "Brinquedos 3D da Catarina"    │
├─────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ 📦  │ │ 📦  │ │ 📦  │        │
│ │$5.00│ │$8.00│ │$3.00│        │
│ └─────┘ └─────┘ └─────┘        │
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ 📦  │ │ 📦  │ │ 📦  │        │
│ └─────┘ └─────┘ └─────┘        │
├─────────────────────────────────┤
│ 🛒 Cart (2)              $13.00 │
└─────────────────────────────────┘
```

**Checkout**
```
┌─────────────────────────────────┐
│ ← Checkout                      │
├─────────────────────────────────┤
│ Seu Pedido                      │
│ • Chaveiro Dino x1      $5.00   │
│ • Miniatura Carro x1    $8.00   │
│                        ──────   │
│ Subtotal               $13.00   │
│ Shipping                $5.00   │
│ Total                  $18.00   │
├─────────────────────────────────┤
│ Entrega:                        │
│ ○ Pickup (escola/presencial)    │
│ ● Ship to address               │
│                                 │
│ Nome: [_______________]         │
│ Email: [______________]         │
│ Endereço: [___________]         │
│ Cidade: [____] State [__]       │
│ ZIP: [_____]                    │
├─────────────────────────────────┤
│ [    💳 Pay with Stripe    ]    │
└─────────────────────────────────┘
```

**Admin - Produtos**
```
┌─────────────────────────────────┐
│ 🔧 Admin - Produtos    [+ Add]  │
├─────────────────────────────────┤
│ 📦 Chaveiro Dino      $5.00 [✏️][🗑️]│
│ 📦 Miniatura Carro    $8.00 [✏️][🗑️]│
│ 📦 Robô Articulado   $12.00 [✏️][🗑️]│
└─────────────────────────────────┘
```

### Design Tokens
- **Cores:** Vibrante e infantil (rosa, roxo, azul, amarelo) — paleta TBD com Catarina
- **Tipografia:** Rounded/friendly (Nunito ou similar)
- **Espaçamento:** 4px base, scale 4-8-12-16-24-32-48
- **Border radius:** Arredondado (8-12px)
- **Vibe:** Divertido, colorido, fácil de usar

## 5. Arquitetura Frontend (Lucas)

### Estrutura de Componentes
```
src/
  app/
    page.tsx                 — Home/Catálogo
    product/[id]/page.tsx    — Detalhe do produto
    cart/page.tsx            — Carrinho
    checkout/page.tsx        — Checkout
    success/page.tsx         — Confirmação
    admin/
      page.tsx               — Dashboard admin
      products/page.tsx      — Lista produtos
      products/new/page.tsx  — Novo produto
      products/[id]/page.tsx — Editar produto
  components/
    ui/
      Button, Input, Card, Modal, ImageUpload
    features/
      ProductCard, ProductGrid, CartItem, CartSummary
      CheckoutForm, AdminProductForm
  lib/
    cart.ts                  — Zustand cart store
    api.ts                   — API client helpers
```

### Rotas
| Rota | Descrição | Auth |
|------|-----------|------|
| / | Catálogo de produtos | Público |
| /product/[id] | Página do produto | Público |
| /cart | Carrinho | Público |
| /checkout | Checkout + pagamento | Público |
| /success | Confirmação pós-compra | Público |
| /admin | Dashboard admin | Admin |
| /admin/products | CRUD produtos | Admin |

### Estado
- **Cart:** Zustand + localStorage (persistência)
- **Server state:** React Query ou SWR para produtos
- **Forms:** React Hook Form + Zod

## 6. Arquitetura Backend (Thiago)

### API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /api/products | Lista produtos (ativos) | Não |
| GET | /api/products/[id] | Detalhe produto | Não |
| POST | /api/products | Criar produto | Admin |
| PUT | /api/products/[id] | Atualizar produto | Admin |
| DELETE | /api/products/[id] | Deletar produto | Admin |
| POST | /api/upload | Upload imagem (Cloudinary/S3) | Admin |
| POST | /api/checkout | Criar sessão Stripe | Não |
| POST | /api/webhook/stripe | Webhook Stripe | Stripe |
| GET | /api/orders | Lista pedidos | Admin |
| GET | /api/orders/[id] | Detalhe pedido | Admin |

### Serviços
- **ProductService:** CRUD de produtos
- **OrderService:** Criar pedido, atualizar status
- **StripeService:** Criar checkout session, processar webhook
- **EmailService:** Notificação de novo pedido (Resend ou similar)

### Auth Admin
- Simples: senha única no env (ADMIN_PASSWORD)
- Login via /admin/login → set cookie → middleware protege /admin/*

## 7. Modelo de Dados (Camila)

### Prisma Schema

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Int      // cents (e.g., 500 = $5.00)
  imageUrl    String?
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orderItems  OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  status          OrderStatus @default(PENDING)
  customerName    String
  customerEmail   String
  shippingAddress String?     // null if pickup
  shippingMethod  ShippingMethod
  shippingCost    Int         // cents
  subtotal        Int         // cents
  total           Int         // cents
  stripeSessionId String?
  stripePaymentId String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  items           OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Int     // cents (snapshot at time of order)
  
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}

enum ShippingMethod {
  PICKUP
  SHIPPING
}
```

## 8. Infraestrutura (Rafael)

### Deploy
- **Hosting:** Vercel (free tier)
- **Database:** Vercel Postgres ou Supabase (free tier)
- **Images:** Cloudinary (free tier) ou Vercel Blob
- **Payments:** Stripe
- **Email:** Resend (free tier)

### Domínio
- **MVP:** 3dshoppop.vercel.app
- **Futuro:** 3dshoppop.com (quando decidir comprar)

### Environment Variables
```
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_URL= (ou BLOB_READ_WRITE_TOKEN)
RESEND_API_KEY=
ADMIN_PASSWORD=
NEXTAUTH_SECRET=
```

### CI/CD
- Vercel auto-deploy on push to main
- Preview deploys em PRs

## 9. Plano de Execução

### Fase 1: Setup (1 dia)
- [ ] Criar projeto Next.js + TypeScript + Tailwind
- [ ] Setup Prisma + PostgreSQL (Vercel Postgres)
- [ ] Configurar Stripe (test mode)
- [ ] Deploy inicial no Vercel
- [ ] Repo git em /Users/admin/www/3d-shop-pop

### Fase 2: Core Loja (3-4 dias)
- [ ] Model Product + seed com mocks
- [ ] Página catálogo (grid de produtos)
- [ ] Página de produto individual
- [ ] Carrinho (Zustand + localStorage)
- [ ] Checkout UI + integração Stripe
- [ ] Webhook Stripe + criar Order
- [ ] Página de sucesso

### Fase 3: Admin (2-3 dias)
- [ ] Auth admin simples (senha)
- [ ] CRUD de produtos
- [ ] Upload de imagens
- [ ] Lista de pedidos

### Fase 4: Polish (1-2 dias)
- [ ] Email de confirmação
- [ ] Mobile polish
- [ ] Loading/error states
- [ ] SEO básico
- [ ] Testes manuais

### Total estimado: ~8-10 dias de dev

## 10. Riscos e Dependências

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Stripe setup demora | Médio | Começar em test mode, só precisa de conta real pra prod |
| Fotos dos produtos não prontas | Baixo | Usar placeholders, trocar depois |
| Catarina não consegue usar admin | Médio | UX ultra simples, testar com ela |
| Free tiers acabam | Baixo | Volume baixo, vai demorar pra atingir limites |

### Dependências
- Conta Stripe do Marcelo (ou criar nova)
- Fotos dos produtos (podem vir depois)
- Definição de preços (podem ser mocks iniciais)
- Decisão sobre frete (flat rate por enquanto)

## 11. Decisões Técnicas

- **Guest checkout only:** Sem login de clientes — simplifica muito o MVP. Adicionar depois se necessário.
- **Preços em centavos:** Evita problemas de float com dinheiro.
- **Senha única admin:** Suficiente pro MVP. NextAuth se precisar de mais.
- **Cloudinary para imagens:** Free tier generoso, fácil de usar.
- **Flat rate shipping:** $5 local, $8 nacional. Simplifica v1.

---

## Aprovação

- [ ] Cliente (Marcelo)
- [ ] PM (Pedro)

_Após aprovação, criar projeto e iniciar Fase 1._
