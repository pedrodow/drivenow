export type FuelType = "flex" | "hibrido" | "eletrico";
export type Transmission = "manual" | "automatico";

export type FleetCategory = {
  slug: string;
  name: string;
  description: string;
  priceFrom: number;
};

export type Vehicle = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  pricePerDay: number;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  horsepower: number;
  image: string | null;
  imageAlt: string;
  highlight: string;
  tags: string[];
  available: boolean;
};

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  vehicle?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
