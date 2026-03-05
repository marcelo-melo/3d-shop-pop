'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[480px] mx-auto px-4 py-6">
        <div className="animate-pulse bg-gray-200 h-64 rounded-3xl"></div>
      </div>
    );
  }

  const total = getTotal();
  const formattedTotal = (total / 100).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="max-w-[480px] mx-auto px-4 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800"
        >
          ← Back to shop
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100 text-center">
          <span className="text-8xl block mb-4">🛒</span>
          
          <h1 className="text-2xl font-extrabold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any magical toys yet!
          </p>

          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-8 rounded-full font-bold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Browse Products ✨
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800"
      >
        ← Continue shopping
      </Link>

      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        Your Cart 🛒
      </h1>

      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const itemPrice = (item.product.price / 100).toFixed(2);
          const itemTotal = ((item.product.price * item.quantity) / 100).toFixed(2);
          
          return (
            <div 
              key={item.product.id}
              className="bg-white rounded-2xl p-4 shadow-lg border-2 border-purple-100 flex gap-4"
            >
              {/* Emoji */}
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{item.product.emoji || '🎁'}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">
                  {item.product.name}
                </h3>
                <p className="text-purple-600 font-semibold">
                  ${itemPrice} each
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-800 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total & Remove */}
              <div className="text-right flex flex-col justify-between">
                <p className="font-bold text-gray-800">
                  ${itemTotal}
                </p>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold text-gray-800">${formattedTotal}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-500 text-sm">Calculated at checkout</span>
        </div>

        <Link
          href="/checkout"
          className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
