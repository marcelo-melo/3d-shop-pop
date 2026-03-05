import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      {/* Botão Voltar */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold mb-6 hover:text-purple-800"
      >
        ← Voltar às compras
      </Link>

      {/* Placeholder do Carrinho */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-100 text-center">
        <span className="text-8xl block mb-4">🛒</span>
        
        <h1 className="text-2xl font-extrabold text-gray-800 mb-4">
          Carrinho
        </h1>

        <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl p-6 mb-6">
          <span className="text-5xl block mb-3">🚧</span>
          <p className="text-purple-700 font-bold text-lg">
            Em breve!
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Estamos trabalhando para trazer a melhor experiência de compra para você!
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-8 rounded-full font-bold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
        >
          Ver Produtos ✨
        </Link>
      </div>
    </div>
  );
}
