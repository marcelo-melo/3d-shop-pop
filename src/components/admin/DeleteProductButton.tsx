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
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? 'Deletando...' : 'Deletar'}
    </button>
  );
}
