import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-sticky-cta-bar',
  imports: [],
  templateUrl: './sticky-cta-bar.html',
  styleUrl: './sticky-cta-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyCtaBarComponent {
  private whatsAppService = inject(WhatsAppService);

  openWhatsApp(): void {
    this.whatsAppService.openGeneralContact();
  }
}
