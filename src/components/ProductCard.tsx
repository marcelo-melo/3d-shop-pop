'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

// Emoji mapping for products
const productEmojis: Record<string, string> = {
  'dino-rex': '🦖',
  'unicornio-magico': '🦄',
  'robo-dance': '🤖',
  'foguete-espacial': '🚀',
  'dragao-fofinho': '🐉',
  'princesa-guerreira': '👸',
};

interface Product {
  id: string;
  name: string;
  price: number; // cents
  description?: string | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const emoji = productEmojis[product.id] || '🎁';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji,
    });
  };

  // Format price from cents to dollars
  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 border-2 border-purple-100">
        {/* Placeholder de imagem com emoji */}
        <div className="h-32 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center">
          <span className="text-6xl">{emoji}</span>
        </div>
        
        {/* Info do produto */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-purple-600 font-bold text-lg">
            ${formattedPrice}
          </p>
          
          <button
            onClick={handleAddToCart}
            className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-full font-semibold text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-md"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </Link>
  );
}
