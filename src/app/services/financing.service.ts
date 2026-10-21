import { Injectable, signal } from '@angular/core';

export interface InstallmentCalculation {
  price: number;
  downPayment: number;
  financedAmount: number;
  installments: number;
  monthlyPayment: number;
  totalWithInterest: number;
}

@Injectable({
  providedIn: 'root',
})
export class FinancingService {
  // Taxa de juros especial de lançamento da campanha Moto Force: 1.19% a.m.
  private readonly MONTHLY_INTEREST_RATE = 0.0119;

  readonly lastSimulation = signal<InstallmentCalculation | null>(null);
  readonly isSubmitted = signal<boolean>(false);

  calculateInstallment(price: number, downPayment: number, installments: number): InstallmentCalculation {
    const financed = Math.max(0, price - downPayment);
    const r = this.MONTHLY_INTEREST_RATE;
    const n = Math.max(1, installments);

    let monthly = 0;
    if (financed <= 0) {
      monthly = 0;
    } else {
      // Fórmula da Tabela Price: P * [ r * (1 + r)^n ] / [ (1 + r)^n - 1 ]
      monthly = (financed * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    const calc: InstallmentCalculation = {
      price,
      downPayment,
      financedAmount: financed,
      installments: n,
      monthlyPayment: Math.round(monthly * 100) / 100,
      totalWithInterest: Math.round((monthly * n + downPayment) * 100) / 100,
    };

    return calc;
  }

  submitProposal(lead: { name: string; phone: string; bikeName: string; calculation: InstallmentCalculation }) {
    console.info('[Moto Force] Proposta de Financiamento enviada:', lead);
    this.lastSimulation.set(lead.calculation);
    this.isSubmitted.set(true);
    setTimeout(() => this.isSubmitted.set(false), 5000);
  }
}
