import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from '@/components/admin/EditProductForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href="/admin/products" className="text-blue-600 hover:underline">
          ← Voltar para Produtos
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Produto</h1>

      <EditProductForm product={product} />
    </div>
  );
}
