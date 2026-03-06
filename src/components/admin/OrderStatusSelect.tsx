'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

const statuses = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'PAID', label: 'Pago' },
  { value: 'SHIPPED', label: 'Enviado' },
  { value: 'DELIVERED', label: 'Entregue' },
  { value: 'CANCELLED', label: 'Cancelado' },
];

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      } else {
        alert('Erro ao atualizar status');
      }
    } catch {
      alert('Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="status" className="text-sm font-medium text-gray-600">
        Status:
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-gray-900"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {loading && <span className="text-gray-400 text-sm">Salvando...</span>}
    </div>
  );
}
