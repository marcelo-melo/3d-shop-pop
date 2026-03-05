'use client';

import { useCartStore, CartProduct } from '@/stores/cartStore';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: CartProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`w-full py-4 rounded-full font-bold text-lg transition-all shadow-lg ${
        added
          ? 'bg-green-500 text-white'
          : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
      }`}
    >
      {added ? 'Added! ✓' : 'Add to Cart 🛒'}
    </button>
  );
}
