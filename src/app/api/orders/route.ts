import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const OrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
  price: z.number().int().min(0), // cents
});

const CreateOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  shippingMethod: z.enum(['PICKUP', 'SHIPPING']),
  shippingAddress: z.string().optional(),
  items: z.array(OrderItemSchema).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateOrderSchema.parse(body);

    // Calculate totals
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingCost = data.shippingMethod === 'SHIPPING' ? 500 : 0; // $5.00 flat
    const total = subtotal + shippingCost;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        shippingMethod: data.shippingMethod,
        shippingAddress: data.shippingAddress || null,
        shippingCost,
        subtotal,
        total,
        status: 'PENDING',
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid order data', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
