import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private whatsAppService = inject(WhatsAppService);

  openWhatsApp(): void {
    this.whatsAppService.openGeneralContact();
  }
}
