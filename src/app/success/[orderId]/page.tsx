import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface SuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export const dynamic = 'force-dynamic';

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
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

  // Emoji mapping for products
  const productEmojis: Record<string, string> = {
    'dino-rex': '🦖',
    'unicornio-magico': '🦄',
    'robo-dance': '🤖',
    'foguete-espacial': '🚀',
    'dragao-fofinho': '🐉',
    'princesa-guerreira': '👸',
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-6 mb-4">
          <span className="text-6xl">✨</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Thank You!
        </h1>
        <p className="text-gray-600">
          Your order has been placed successfully
        </p>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 mb-6">
        <div className="text-center mb-6 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="font-mono text-lg font-bold text-purple-600 break-all">
            {order.id}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Customer</span>
            <span className="font-semibold text-gray-800">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-semibold text-gray-800 text-sm">{order.customerEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span className="font-semibold text-gray-800">
              {order.shippingMethod === 'PICKUP' ? '🏪 Pickup' : '📦 Shipping'}
            </span>
          </div>
          {order.shippingAddress && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Ship to:</p>
              <p className="text-gray-800">{order.shippingAddress}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-bold text-gray-800 mb-3">Items</h3>
          <div className="space-y-3">
            {order.items.map((item) => {
              const emoji = productEmojis[item.product.id] || '🎁';
              return (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <span className="text-gray-800">
                      {item.product.name} × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${(order.subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">
              {order.shippingCost === 0 ? 'FREE' : `$${(order.shippingCost / 100).toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-purple-600">${(order.total / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Notice */}
      <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-2xl p-6 text-center mb-6">
        <span className="text-4xl block mb-3">💳</span>
        <h3 className="font-bold text-orange-800 mb-2">Payment Pending</h3>
        <p className="text-orange-700 text-sm">
          We&apos;ll send you a payment link shortly. Your order will be processed once payment is confirmed.
        </p>
      </div>

      {/* Continue Shopping */}
      <Link
        href="/"
        className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
      >
        Continue Shopping 🛍️
      </Link>
    </div>
  );
}
