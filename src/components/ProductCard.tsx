'use client';

import Link from 'next/link';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implementar carrinho com Zustand
    alert(`${product.name} adicionado ao carrinho! 🎉`);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200 border-2 border-purple-100">
        {/* Placeholder de imagem com emoji */}
        <div className="h-32 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center">
          <span className="text-6xl">{product.emoji}</span>
        </div>
        
        {/* Info do produto */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-purple-600 font-bold text-lg">
            R$ {product.price.toFixed(2)}
          </p>
          
          <button
            onClick={handleAddToCart}
            className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-full font-semibold text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-md"
          >
            Adicionar 🛒
          </button>
        </div>
      </div>
    </Link>
  );
}
