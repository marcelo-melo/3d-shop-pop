import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
};

const shippingMethodLabels: Record<string, string> = {
  PICKUP: 'Retirada',
  SHIPPING: 'Entrega',
};

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-blue-600 hover:underline">
          ← Voltar para Pedidos
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pedido #{order.id.slice(0, 8)}</h1>
          <p className="text-gray-500">
            Criado em {new Date(order.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações do Cliente</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Nome:</span> {order.customerName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {order.customerEmail}
            </p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Entrega</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Método:</span> {shippingMethodLabels[order.shippingMethod]}
            </p>
            {order.shippingAddress && (
              <p className="text-gray-700">
                <span className="font-medium">Endereço:</span><br />
                <span className="whitespace-pre-line">{order.shippingAddress}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Itens do Pedido</h2>
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left pb-3 text-sm font-medium text-gray-500">Produto</th>
              <th className="text-center pb-3 text-sm font-medium text-gray-500">Qtd</th>
              <th className="text-right pb-3 text-sm font-medium text-gray-500">Preço Unit.</th>
              <th className="text-right pb-3 text-sm font-medium text-gray-500">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 text-gray-900">{item.product.name}</td>
                <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                <td className="py-3 text-right text-gray-600">
                  ${(item.price / 100).toFixed(2)}
                </td>
                <td className="py-3 text-right text-gray-900 font-medium">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${(order.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Frete</span>
            <span>${(order.shippingCost / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
            <span>Total</span>
            <span>${(order.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {order.stripePaymentId && (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pagamento</h2>
          <p className="text-gray-600 font-mono text-sm">
            Stripe Payment ID: {order.stripePaymentId}
          </p>
        </div>
      )}
    </div>
  );
}
