import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { MotorcycleService } from './motorcycle.service';

describe('MotorcycleService', () => {
  let service: MotorcycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorcycleService);
  });

  it('should be created and load initial motorcycle catalog', () => {
    expect(service).toBeTruthy();
    const motos = service.motorcycles();
    expect(motos.length).toBe(3);
    expect(motos.some((m) => m.name.includes('CB 500X'))).toBe(true);
    expect(motos.some((m) => m.name.includes('MT-07'))).toBe(true);
    expect(motos.some((m) => m.name.includes('G 310 GS'))).toBe(true);
  });

  it('should find motorcycle by id', () => {
    const moto = service.getMotorcycleById('honda-cb-500x');
    expect(moto).toBeDefined();
    expect(moto?.brand).toBe('Honda');
  });

  it('should update selected motorcycle signal', () => {
    const moto = service.getMotorcycleById('yamaha-mt-07');
    service.selectMotorcycle(moto || null);
    expect(service.selectedMotorcycle()?.id).toBe('yamaha-mt-07');

    service.selectMotorcycle(null);
    expect(service.selectedMotorcycle()).toBeNull();
  });
});
