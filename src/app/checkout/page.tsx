'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const checkoutSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  shippingMethod: z.enum(['PICKUP', 'SHIPPING']),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
}).refine((data) => {
  if (data.shippingMethod === 'SHIPPING') {
    return data.address && data.city && data.state && data.zip;
  }
  return true;
}, {
  message: 'Address is required for shipping',
  path: ['address'],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'PICKUP',
    },
  });

  const shippingMethod = watch('shippingMethod');

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

  if (items.length === 0) {
    router.replace('/cart');
    return null;
  }

  const subtotal = getTotal();
  const shippingCost = shippingMethod === 'SHIPPING' ? 500 : 0;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      const shippingAddress = data.shippingMethod === 'SHIPPING'
        ? `${data.address}, ${data.city}, ${data.state} ${data.zip}`
        : undefined;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          shippingMethod: data.shippingMethod,
          shippingAddress,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      clearCart();
      router.push(`/success/${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      <Link 
        href="/cart"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800"
      >
        ← Back to cart
      </Link>

      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
        Checkout 📦
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <h2 className="font-bold text-gray-800 mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                {...register('customerName')}
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                placeholder="Your name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('customerEmail')}
                type="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                placeholder="you@example.com"
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <h2 className="font-bold text-gray-800 mb-4">Delivery Method</h2>
          
          <div className="space-y-3">
            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              shippingMethod === 'PICKUP' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-200'
            }`}>
              <input
                {...register('shippingMethod')}
                type="radio"
                value="PICKUP"
                className="sr-only"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">🏪 Pickup</span>
                <p className="text-sm text-gray-500">Pick up at our location</p>
              </div>
              <span className="font-bold text-green-600">FREE</span>
            </label>

            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              shippingMethod === 'SHIPPING' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-200'
            }`}>
              <input
                {...register('shippingMethod')}
                type="radio"
                value="SHIPPING"
                className="sr-only"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-800">📦 Shipping</span>
                <p className="text-sm text-gray-500">Delivered to your address</p>
              </div>
              <span className="font-bold text-purple-600">$5.00</span>
            </label>
          </div>

          {/* Shipping Address */}
          {shippingMethod === 'SHIPPING' && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  {...register('address')}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    {...register('state')}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                    placeholder="FL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  {...register('zip')}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
                  placeholder="32801"
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.emoji} {item.product.name} × {item.quantity}
                </span>
                <span className="font-semibold text-gray-800">
                  ${((item.product.price * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">
                {shippingCost === 0 ? 'FREE' : `$${(shippingCost / 100).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-purple-600">${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order 🎉'}
        </button>

        <p className="text-center text-sm text-gray-500">
          💳 Payment will be requested separately
        </p>
      </form>
    </div>
  );
}
