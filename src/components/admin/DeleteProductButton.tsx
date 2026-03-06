'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar "${productName}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Erro ao deletar produto');
      }
    } catch {
      alert('Erro ao deletar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex-1 text-center bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
    >
      {loading ? '...' : '🗑️ Deletar'}
    </button>
  );
}
