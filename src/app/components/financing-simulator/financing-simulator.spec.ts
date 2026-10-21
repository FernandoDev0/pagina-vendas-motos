import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FinancingSimulatorComponent } from './financing-simulator';

describe('FinancingSimulatorComponent', () => {
  let component: FinancingSimulatorComponent;
  let fixture: ComponentFixture<FinancingSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingSimulatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancingSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default 48 installments and calculate monthly payment', () => {
    expect(component.currentInstallments()).toBe(48);
    expect(component.calculation().monthlyPayment).toBeGreaterThan(0);
    expect(component.calculation().installments).toBe(48);
  });

  it('should update current installments and recalculate when clicking installment option', () => {
    component.setInstallmentOption(24);
    expect(component.currentInstallments()).toBe(24);
    expect(component.calculation().installments).toBe(24);

    component.setInstallmentOption(12);
    expect(component.currentInstallments()).toBe(12);
    expect(component.calculation().installments).toBe(12);
  });

  it('should update down payment preset', () => {
    const bikePrice = component.currentBike().price;
    component.setDownPaymentPreset(20);
    expect(component.currentDownPayment()).toBe(Math.round(bikePrice * 0.2));
  });

  it('should mark form invalid when submitting without required fields', () => {
    component.form.controls.name.setValue('');
    component.form.controls.phone.setValue('');
    component.submitSimulation();
    expect(component.isSubmitted()).toBe(false);
  });

  it('should submit simulation successfully when valid', () => {
    component.form.controls.name.setValue('Carlos Silva');
    component.form.controls.phone.setValue('(11) 98888-7777');
    component.submitSimulation();
    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionMessage()).toContain('Carlos Silva');
  });
});
