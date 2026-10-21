import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TestimonialsComponent } from './testimonials';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render customer testimonials with photos and ratings', () => {
    const list = component.testimonials();
    expect(list.length).toBe(2);

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.testimonial-item');
    expect(items.length).toBe(2);

    const photos = compiled.querySelectorAll('.customer-bike-photo');
    expect(photos.length).toBe(2);
  });
});
