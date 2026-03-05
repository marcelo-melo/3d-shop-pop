'use client';

interface AddToCartButtonProps {
  productName: string;
}

export default function AddToCartButton({ productName }: AddToCartButtonProps) {
  const handleClick = () => {
    alert(`${productName} adicionado ao carrinho! 🎉`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
    >
      Adicionar ao Carrinho 🛒
    </button>
  );
}
