import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppService {
  private readonly DEALERSHIP_PHONE = '551155835550';

  openWhatsAppWithBike(bikeName: string, customerName?: string, downPayment?: number, installments?: number): void {
    let message = `Olá, equipe Moto Force! Gostaria de mais informações sobre a ${bikeName} anunciada com preço especial de R$ 29.900.`;

    if (customerName) {
      message = `Olá! Meu nome é ${customerName}. Tenho interesse na ${bikeName} anunciada no site da Moto Force.`;
    }

    if (downPayment && installments) {
      message += ` Fiz uma simulação com entrada de R$ ${downPayment.toLocaleString('pt-BR')} em ${installments}x e gostaria de aprovar minha ficha online!`;
    }

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${this.DEALERSHIP_PHONE}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openGeneralContact(): void {
    const message = encodeURIComponent('Olá! Gostaria de falar com um consultor da Moto Force sobre as ofertas de motos novas e seminovas.');
    window.open(`https://wa.me/${this.DEALERSHIP_PHONE}?text=${message}`, '_blank', 'noopener,noreferrer');
  }
}
