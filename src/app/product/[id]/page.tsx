import Link from 'next/link';
import { getProductById, products } from '@/lib/products';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      {/* Botão Voltar */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800"
      >
        ← Voltar
      </Link>

      {/* Imagem do Produto */}
      <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 rounded-3xl h-64 flex items-center justify-center mb-6 shadow-lg">
        <span className="text-9xl">{product.emoji}</span>
      </div>

      {/* Info do Produto */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          {product.name}
        </h1>
        
        <p className="text-3xl font-bold text-purple-600 mb-4">
          R$ {product.price.toFixed(2)}
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
            🎨 Impressão 3D
          </span>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
            ✨ Único
          </span>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
            🌟 Exclusivo
          </span>
        </div>

        {/* Botão Add to Cart */}
        <AddToCartButton productName={product.name} />
      </div>
    </div>
  );
}
