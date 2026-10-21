import { Injectable, signal, computed } from '@angular/core';
import { Motorcycle } from '../models/motorcycle.model';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleService {
  private readonly _motorcycles = signal<Motorcycle[]>([
    {
      id: 'honda-cb-500x',
      name: 'Honda CB 500X',
      brand: 'Honda',
      category: 'Crossover / Adventure',
      year: 2024,
      displacementCc: 471,
      powerHp: 50.4,
      torqueNm: 4.55,
      fuelCapacityL: 17.7,
      weightKg: 197,
      transmission: '6 velocidades',
      price: 29900,
      image: '/images/honda-cb500x.png',
      tags: [
        { label: 'OFERTA', type: 'offer' },
      ],
      hasRibbon: false,
      specs: {
        motor: 'Dois cilindros paralelos, 4 tempos, DOHC',
        potencia: '50,4 cv a 8.500 rpm',
        torque: '4,55 kgf.m a 6.500 rpm',
        freios: 'Disco duplo dianteiro com ABS de dois canais',
        partida: 'Elétrica',
        refrigeracao: 'Líquida',
      },
    },
    {
      id: 'yamaha-mt-07',
      name: 'Yamaha MT-07',
      brand: 'Yamaha',
      category: 'Naked Esportiva',
      year: 2024,
      displacementCc: 689,
      powerHp: 74.8,
      torqueNm: 6.9,
      fuelCapacityL: 14.0,
      weightKg: 184,
      transmission: '6 velocidades',
      price: 29900,
      image: '/images/yamaha-mt07.png',
      tags: [
        { label: 'OFERTA', type: 'offer' },
      ],
      hasRibbon: true,
      ribbonText: 'ÚLTIMA UNIDADE',
      specs: {
        motor: 'Crossplane bicilíndrico (CP2), 4 tempos, DOHC',
        potencia: '74,8 cv a 9.000 rpm',
        torque: '6,9 kgf.m a 6.500 rpm',
        freios: 'Disco duplo flutuante de 298mm com ABS',
        partida: 'Elétrica',
        refrigeracao: 'Líquida',
      },
    },
    {
      id: 'bmw-g-310-gs',
      name: 'BMW G 310 GS',
      brand: 'BMW',
      category: 'Trail Premium',
      year: 2024,
      displacementCc: 313,
      powerHp: 34.0,
      torqueNm: 2.8,
      fuelCapacityL: 11.5,
      weightKg: 175,
      transmission: '6 velocidades',
      price: 29900,
      image: '/images/bmw-g310gs.png',
      tags: [
        { label: 'ÚLTIMA UNIDADE', type: 'last-unit' },
      ],
      hasRibbon: true,
      ribbonText: 'ÚLTIMA UNIDADE',
      specs: {
        motor: 'Monocilíndrico, 4 tempos, 4 válvulas, DOHC',
        potencia: '34 cv a 9.250 rpm',
        torque: '2,8 kgf.m a 7.500 rpm',
        freios: 'BMW Motorrad ABS com cáliper radial ByBre',
        partida: 'Elétrica',
        refrigeracao: 'Líquida',
      },
    },
  ]);

  readonly motorcycles = this._motorcycles.asReadonly();
  readonly featuredMotorcycles = computed(() => this._motorcycles());

  readonly selectedMotorcycle = signal<Motorcycle | null>(null);

  getMotorcycleById(id: string): Motorcycle | undefined {
    return this._motorcycles().find((m) => m.id === id);
  }

  selectMotorcycle(moto: Motorcycle | null): void {
    this.selectedMotorcycle.set(moto);
  }
}
