import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [productCount, orderCount, pendingOrders, totalRevenue] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.aggregate({
      where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } },
      _sum: { total: true },
    }),
  ]);

  return {
    productCount,
    orderCount,
    pendingOrders,
    totalRevenue: totalRevenue._sum.total ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Produtos Ativos', value: stats.productCount, href: '/admin/products', color: 'bg-blue-500' },
    { label: 'Total de Pedidos', value: stats.orderCount, href: '/admin/orders', color: 'bg-green-500' },
    { label: 'Pedidos Pendentes', value: stats.pendingOrders, href: '/admin/orders', color: 'bg-yellow-500' },
    { label: 'Receita Total', value: `$${(stats.totalRevenue / 100).toFixed(2)}`, href: '/admin/orders', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
              {card.label === 'Produtos Ativos' && '🎁'}
              {card.label === 'Total de Pedidos' && '📦'}
              {card.label === 'Pedidos Pendentes' && '⏳'}
              {card.label === 'Receita Total' && '💰'}
            </div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Novo Produto
            </Link>
            <Link
              href="/admin/orders"
              className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver Pedidos
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Links Úteis</h2>
          <div className="space-y-2">
            <a
              href="/"
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              🏠 Ver Loja
            </a>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline"
            >
              💳 Stripe Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
