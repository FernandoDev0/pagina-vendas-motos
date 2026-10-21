import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner';
import { AdvantagesBarComponent } from '../../components/advantages-bar/advantages-bar';
import { FeaturedCatalogComponent } from '../../components/featured-catalog/featured-catalog';
import { FinancingSimulatorComponent } from '../../components/financing-simulator/financing-simulator';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [
    HeroBannerComponent,
    AdvantagesBarComponent,
    FeaturedCatalogComponent,
    FinancingSimulatorComponent,
    TestimonialsComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
