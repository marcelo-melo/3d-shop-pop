import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
          Brinquedos Mágicos
        </h2>
        <p className="text-gray-600 text-sm">
          Impressos em 3D com muito carinho! 🎨✨
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Banner */}
      <div className="mt-8 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-2xl p-6 text-center shadow-lg">
        <span className="text-4xl block mb-2">🎁</span>
        <p className="font-bold text-purple-800">
          Frete grátis acima de R$ 150!
        </p>
      </div>
    </div>
  );
}
