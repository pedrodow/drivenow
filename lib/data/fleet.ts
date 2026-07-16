import type { FleetCategory, Vehicle } from "@/lib/types";

/**
 * Static catalog for now. Exposed only through the functions below so a
 * future swap to a CMS/API doesn't ripple through call sites.
 */
const categories: FleetCategory[] = [
  {
    slug: "entrada",
    name: "Entrada",
    description: "Carros populares, econômicos e fáceis de dirigir no dia a dia.",
    priceFrom: 119,
  },
  {
    slug: "compacto",
    name: "Compacto & Sedã",
    description: "Mais espaço e equipamento, ideal para viagens e cidade.",
    priceFrom: 159,
  },
  {
    slug: "suv",
    name: "SUV",
    description: "Robustez, espaço e visibilidade para família e estrada.",
    priceFrom: 229,
  },
  {
    slug: "prestige",
    name: "Prestige",
    description: "A linha mais luxuosa da nossa frota, para ocasiões especiais.",
    priceFrom: 349,
  },
];

const vehicles: Vehicle[] = [
  {
    slug: "renault-kwid",
    name: "Kwid Zen",
    brand: "Renault",
    category: "Entrada",
    categorySlug: "entrada",
    pricePerDay: 119,
    transmission: "manual",
    fuel: "flex",
    seats: 5,
    horsepower: 70,
    image: null,
    imageAlt: "Renault Kwid Zen, hatch compacto na cor branca",
    highlight: "O jeito mais econômico de rodar pela cidade.",
    tags: ["Baixo consumo", "Fácil de estacionar"],
    available: true,
  },
  {
    slug: "fiat-mobi",
    name: "Mobi Like",
    brand: "Fiat",
    category: "Entrada",
    categorySlug: "entrada",
    pricePerDay: 129,
    transmission: "manual",
    fuel: "flex",
    seats: 5,
    horsepower: 75,
    image: null,
    imageAlt: "Fiat Mobi Like, hatch compacto",
    highlight: "Compacto, ágil e com ótimo custo-benefício.",
    tags: ["Ar-condicionado", "Direção elétrica"],
    available: true,
  },
  {
    slug: "chevrolet-onix",
    name: "Onix LT",
    brand: "Chevrolet",
    category: "Entrada",
    categorySlug: "entrada",
    pricePerDay: 139,
    transmission: "manual",
    fuel: "flex",
    seats: 5,
    horsepower: 82,
    image: null,
    imageAlt: "Chevrolet Onix LT, hatch compacto prata",
    highlight: "O queridinho do Brasil: espaçoso e confiável.",
    tags: ["Multimídia", "5 lugares"],
    available: true,
  },
  {
    slug: "hyundai-hb20-platinum-plus",
    name: "HB20 Platinum Plus",
    brand: "Hyundai",
    category: "Compacto & Sedã",
    categorySlug: "compacto",
    pricePerDay: 159,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 120,
    image: "/images/fleet/hyundai-hb20-platinum-plus.png",
    imageAlt: "Hyundai HB20 Platinum Plus azul, vista lateral em estúdio",
    highlight: "Acabamento premium com câmbio automático de série.",
    tags: ["Câmbio automático", "Central multimídia"],
    available: true,
  },
  {
    slug: "volkswagen-polo-gts",
    name: "Polo GTS",
    brand: "Volkswagen",
    category: "Compacto & Sedã",
    categorySlug: "compacto",
    pricePerDay: 189,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 150,
    image: "/images/fleet/volkswagen-polo-gts.png",
    imageAlt: "Volkswagen Polo GTS prata, vista lateral em estúdio",
    highlight: "Esportivo, moderno e com motor turbo de 150 cv.",
    tags: ["Motor turbo", "Modo Sport"],
    available: true,
  },
  {
    slug: "fiat-fastback-limited",
    name: "Fastback Limited",
    brand: "Fiat",
    category: "SUV",
    categorySlug: "suv",
    pricePerDay: 229,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 185,
    image: "/images/fleet/fiat-fastback-limited.png",
    imageAlt: "Fiat Fastback Limited cinza-escuro, vista lateral à noite",
    highlight: "SUV coupé com design arrojado e motor turbo 185 cv.",
    tags: ["Motor turbo 185cv", "Design coupé"],
    available: true,
  },
  {
    slug: "jeep-compass-s-series",
    name: "Compass S-Series",
    brand: "Jeep",
    category: "SUV",
    categorySlug: "suv",
    pricePerDay: 279,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 185,
    image: "/images/fleet/jeep-compass-s-series.png",
    imageAlt: "Jeep Compass S-Series branco, vista lateral em estúdio",
    highlight: "Presença de sobra e conforto para estrada e cidade.",
    tags: ["Tração 4x2", "Teto solar"],
    available: true,
  },
  {
    slug: "sedan-esportivo-prestige",
    name: "Sedã Esportivo Prestige",
    brand: "Prestige Collection",
    category: "Prestige",
    categorySlug: "prestige",
    pricePerDay: 419,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 280,
    image: "/images/fleet/sedan-prestige.png",
    imageAlt: "Sedã esportivo de luxo, vista lateral em estúdio com fundo escuro",
    highlight: "Desempenho e sofisticação para quem exige o melhor.",
    tags: ["280 cv", "Interior em couro"],
    available: true,
  },
  {
    slug: "suv-luxo-prestige",
    name: "SUV de Luxo Prestige",
    brand: "Prestige Collection",
    category: "Prestige",
    categorySlug: "prestige",
    pricePerDay: 479,
    transmission: "automatico",
    fuel: "flex",
    seats: 5,
    horsepower: 300,
    image: "/images/fleet/suv-prestige.png",
    imageAlt: "SUV de luxo em estúdio, vista frontal-lateral",
    highlight: "Imponência e conforto absoluto para qualquer ocasião.",
    tags: ["Tração integral", "Suspensão a ar"],
    available: true,
  },
  {
    slug: "elétrico-prestige",
    name: "Elétrico Prestige",
    brand: "Prestige Collection",
    category: "Prestige",
    categorySlug: "prestige",
    pricePerDay: 399,
    transmission: "automatico",
    fuel: "eletrico",
    seats: 5,
    horsepower: 340,
    image: "/images/fleet/eletrico-prestige.png",
    imageAlt: "Veículo elétrico premium com iluminação LED, ambiente escuro",
    highlight: "Zero emissão, aceleração instantânea e silêncio total.",
    tags: ["100% elétrico", "Piloto automático adaptativo"],
    available: true,
  },
];

export function getFleet(): Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getFeaturedFleet(limit = 6): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.image).slice(0, limit);
}

export function getCategories(): FleetCategory[] {
  return categories;
}

export function getVehiclesByCategory(categorySlug: string): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.categorySlug === categorySlug);
}
