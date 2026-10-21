export interface Motorcycle {
  id: string;
  name: string;
  brand: 'Honda' | 'Yamaha' | 'BMW';
  category: string;
  year: number;
  displacementCc: number;
  powerHp: number;
  torqueNm: number;
  fuelCapacityL: number;
  weightKg: number;
  transmission: string;
  price: number;
  image: string;
  tags: {
    label: string;
    type: 'offer' | 'last-unit';
  }[];
  hasRibbon?: boolean;
  ribbonText?: string;
  specs: {
    motor: string;
    potencia: string;
    torque: string;
    freios: string;
    partida: string;
    refrigeracao: string;
  };
}

export interface FinancingSimulationRequest {
  customerName: string;
  phone: string;
  motorcycleId: string;
  downPayment: number;
  installments: number;
}

export interface CustomerTestimonial {
  id: string;
  authorName: string;
  purchasedBike: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}
