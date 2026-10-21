import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MotorcycleService } from '../../services/motorcycle.service';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-vehicle-detail-modal',
  imports: [],
  templateUrl: './vehicle-detail-modal.html',
  styleUrl: './vehicle-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey()',
  },
})
export class VehicleDetailModalComponent {
  private motorcycleService = inject(MotorcycleService);
  private whatsAppService = inject(WhatsAppService);

  readonly selectedMoto = this.motorcycleService.selectedMotorcycle;

  closeModal(): void {
    this.motorcycleService.selectMotorcycle(null);
  }

  onEscapeKey(): void {
    if (this.selectedMoto()) {
      this.closeModal();
    }
  }

  goToFinancing(): void {
    const moto = this.selectedMoto();
    this.closeModal();
    const el = document.getElementById('simulacao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  contactWhatsApp(): void {
    const moto = this.selectedMoto();
    if (moto) {
      this.whatsAppService.openWhatsAppWithBike(moto.name);
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
