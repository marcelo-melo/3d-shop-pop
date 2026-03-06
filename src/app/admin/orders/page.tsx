import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pedidos</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          Nenhum pedido encontrado.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${(order.total / 100).toFixed(2)}
                </span>
              </div>
              
              <div className="text-right mt-2">
                <span className="text-blue-600 text-sm font-medium">
                  Ver Detalhes →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
