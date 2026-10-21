import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FeaturedCatalogComponent } from './featured-catalog';

describe('FeaturedCatalogComponent', () => {
  let component: FeaturedCatalogComponent;
  let fixture: ComponentFixture<FeaturedCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display featured motorcycles', () => {
    const list = component.motorcycles();
    expect(list.length).toBe(3);
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.moto-card');
    expect(cards.length).toBe(3);
  });

  it('should filter motorcycles by brand', () => {
    component.setBrandFilter('Honda');
    expect(component.filteredMotorcycles().length).toBe(1);
    expect(component.filteredMotorcycles()[0].brand).toBe('Honda');

    component.setBrandFilter('all');
    expect(component.filteredMotorcycles().length).toBe(3);
  });
});
