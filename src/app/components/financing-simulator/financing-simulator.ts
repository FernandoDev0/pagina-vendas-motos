import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MotorcycleService } from '../../services/motorcycle.service';
import { FinancingService, InstallmentCalculation } from '../../services/financing.service';
import { WhatsAppService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-financing-simulator',
  imports: [ReactiveFormsModule],
  templateUrl: './financing-simulator.html',
  styleUrl: './financing-simulator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancingSimulatorComponent {
  private fb = inject(NonNullableFormBuilder);
  private motorcycleService = inject(MotorcycleService);
  private financingService = inject(FinancingService);
  private whatsAppService = inject(WhatsAppService);

  readonly motorcycles = this.motorcycleService.motorcycles;
  readonly availableInstallments = signal<number[]>([12, 24, 36, 48, 60]);
  readonly isSubmitted = signal<boolean>(false);
  readonly submissionMessage = signal<string>('');

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9()+\-\s]{10,18}$/)]],
    bikeId: ['honda-cb-500x', [Validators.required]],
    downPayment: [5000, [Validators.required, Validators.min(0)]],
    installments: [48, [Validators.required]],
  });

  // Reactive state signals for instant zoneless updates
  readonly selectedBikeId = signal<string>('honda-cb-500x');
  readonly currentDownPayment = signal<number>(5000);
  readonly currentInstallments = signal<number>(48);

  readonly currentBike = computed(() => {
    const id = this.selectedBikeId();
    return this.motorcycles().find((m) => m.id === id) || this.motorcycles()[0];
  });

  readonly calculation = computed<InstallmentCalculation>(() => {
    const bike = this.currentBike();
    const price = bike ? bike.price : 29900;
    const downPayment = this.currentDownPayment();
    const installments = this.currentInstallments();

    return this.financingService.calculateInstallment(price, downPayment, installments);
  });

  constructor() {
    this.form.controls.bikeId.valueChanges.subscribe((id) => {
      this.selectedBikeId.set(id);
    });

    this.form.controls.downPayment.valueChanges.subscribe((val) => {
      this.currentDownPayment.set(Number(val) || 0);
    });

    this.form.controls.installments.valueChanges.subscribe((val) => {
      this.currentInstallments.set(Number(val) || 48);
    });
  }

  setInstallmentOption(num: number): void {
    this.currentInstallments.set(num);
    this.form.controls.installments.setValue(num);
  }

  onBikeSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select && select.value) {
      this.selectedBikeId.set(select.value);
      this.form.controls.bikeId.setValue(select.value);
    }
  }

  setDownPaymentPreset(percent: number): void {
    const bike = this.currentBike();
    if (!bike) return;
    const amount = Math.round((bike.price * percent) / 100);
    this.currentDownPayment.set(amount);
    this.form.controls.downPayment.setValue(amount);
  }

  submitSimulation(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, phone } = this.form.getRawValue();
    const bike = this.currentBike();
    const calc = this.calculation();

    this.financingService.submitProposal({
      name,
      phone,
      bikeName: bike?.name || 'Moto Force',
      calculation: calc,
    });

    this.submissionMessage.set(
      `Obrigado, ${name}! Sua simulação para a ${bike?.name} com parcelas de R$ ${calc.monthlyPayment.toFixed(2)} foi registrada. Abrindo atendimento no WhatsApp...`
    );
    this.isSubmitted.set(true);

    setTimeout(() => {
      this.whatsAppService.openWhatsAppWithBike(
        bike?.name || 'Moto',
        name,
        calc.downPayment,
        calc.installments
      );
    }, 1200);

    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 8000);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
