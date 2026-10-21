import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { MotorcycleService } from '../../services/motorcycle.service';
import { WhatsAppService } from '../../services/whatsapp.service';
import { Motorcycle } from '../../models/motorcycle.model';

@Component({
  selector: 'app-featured-catalog',
  imports: [],
  templateUrl: './featured-catalog.html',
  styleUrl: './featured-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCatalogComponent {
  private motorcycleService = inject(MotorcycleService);
  private whatsAppService = inject(WhatsAppService);

  readonly activeBrandFilter = signal<string>('all');
  readonly allMotorcycles = this.motorcycleService.motorcycles;
  readonly motorcycles = this.allMotorcycles;

  readonly brands = signal<{ label: string; value: string }[]>([
    { label: 'Todas as Marcas', value: 'all' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Yamaha', value: 'Yamaha' },
    { label: 'BMW', value: 'BMW' },
  ]);

  readonly filteredMotorcycles = computed(() => {
    const brand = this.activeBrandFilter();
    const list = this.allMotorcycles();
    if (brand === 'all') {
      return list;
    }
    return list.filter((m) => m.brand === brand);
  });

  setBrandFilter(brand: string): void {
    this.activeBrandFilter.set(brand);
  }

  openDetailsModal(moto: Motorcycle): void {
    this.motorcycleService.selectMotorcycle(moto);
  }

  contactAboutBike(moto: Motorcycle): void {
    this.whatsAppService.openWhatsAppWithBike(moto.name);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
