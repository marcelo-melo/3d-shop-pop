import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL_TCP,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  {
    id: 'dino-rex',
    name: 'Dino Rex Articulado',
    description: 'Um T-Rex super fofo com articulações que se movem! Perfeito para aventuras pré-históricas.',
    price: 1299, // $12.99 em centavos
    imageUrl: null,
    active: true,
  },
  {
    id: 'unicornio-magico',
    name: 'Unicórnio Mágico',
    description: 'Unicórnio brilhante com chifre dourado e crina colorida. Magia garantida!',
    price: 1599, // $15.99
    imageUrl: null,
    active: true,
  },
  {
    id: 'robo-dance',
    name: 'Robô Dançarino',
    description: 'Robô articulado que parece estar sempre pronto para dançar!',
    price: 1899, // $18.99
    imageUrl: null,
    active: true,
  },
  {
    id: 'foguete-espacial',
    name: 'Foguete Espacial',
    description: 'Foguete com detalhes incríveis. 3, 2, 1... Decolar!',
    price: 1499, // $14.99
    imageUrl: null,
    active: true,
  },
  {
    id: 'dragao-fofinho',
    name: 'Dragão Fofinho',
    description: 'Dragãozinho adorável com asas articuladas. Não solta fogo, só abraços!',
    price: 1699, // $16.99
    imageUrl: null,
    active: true,
  },
  {
    id: 'princesa-guerreira',
    name: 'Princesa Guerreira',
    description: 'Princesa com armadura e espada. Quem disse que princesa não luta?',
    price: 1999, // $19.99
    imageUrl: null,
    active: true,
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    console.log(`✅ Created/Updated product: ${product.name}`);
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
