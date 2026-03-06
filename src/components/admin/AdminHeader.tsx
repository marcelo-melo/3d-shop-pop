'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800 ml-12 lg:ml-0">
        Admin
      </h2>
      
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        Sair
      </button>
    </header>
  );
}
