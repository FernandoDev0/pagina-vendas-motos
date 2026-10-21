import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FinancingService } from './financing.service';

describe('FinancingService', () => {
  let service: FinancingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate installment correctly with down payment', () => {
    // R$ 29.900 com R$ 5.000 de entrada em 48x
    const result = service.calculateInstallment(29900, 5000, 48);
    expect(result.financedAmount).toBe(24900);
    expect(result.installments).toBe(48);
    expect(result.monthlyPayment).toBeGreaterThan(500);
    expect(result.monthlyPayment).toBeLessThan(800);
    service.submitProposal({ name: 'João', phone: '11999999999', bikeName: 'Honda CB 500X', calculation: result });
    expect(service.lastSimulation()).toEqual(result);
  });

  it('should return 0 monthly payment if financed amount is zero', () => {
    const result = service.calculateInstallment(29900, 30000, 48);
    expect(result.financedAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
  });
});
