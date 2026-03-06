import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

export const dynamic = 'force-dynamic';

async function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Novo
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          Nenhum produto cadastrado.
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                      📷
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-green-600">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                    product.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex-1 text-center bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  ✏️ Editar
                </Link>
                <DeleteProductButton productId={product.id} productName={product.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
