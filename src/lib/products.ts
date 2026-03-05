// Mock products data - brinquedos 3D divertidos
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string; // Usando emoji como placeholder de imagem
}

export const products: Product[] = [
  {
    id: "dino-rex",
    name: "Dino Rex Articulado",
    price: 45.00,
    description: "Um T-Rex super fofo com articulações que se movem! Perfeito para aventuras pré-históricas.",
    emoji: "🦖"
  },
  {
    id: "unicornio-magico",
    name: "Unicórnio Mágico",
    price: 55.00,
    description: "Unicórnio brilhante com chifre dourado e crina colorida. Magia garantida!",
    emoji: "🦄"
  },
  {
    id: "robo-dance",
    name: "Robô Dançarino",
    price: 38.00,
    description: "Robô articulado que parece estar sempre pronto para dançar!",
    emoji: "🤖"
  },
  {
    id: "foguete-espacial",
    name: "Foguete Espacial",
    price: 42.00,
    description: "Foguete com detalhes incríveis. 3, 2, 1... Decolar!",
    emoji: "🚀"
  },
  {
    id: "dragao-fofinho",
    name: "Dragão Fofinho",
    price: 60.00,
    description: "Dragãozinho adorável com asas articuladas. Não solta fogo, só abraços!",
    emoji: "🐉"
  },
  {
    id: "princesa-guerreira",
    name: "Princesa Guerreira",
    price: 50.00,
    description: "Princesa com armadura e espada. Quem disse que princesa não luta?",
    emoji: "👸"
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
