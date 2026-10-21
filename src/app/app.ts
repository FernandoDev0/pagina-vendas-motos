import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { StickyCtaBarComponent } from './components/sticky-cta-bar/sticky-cta-bar';
import { VehicleDetailModalComponent } from './components/vehicle-detail-modal/vehicle-detail-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    StickyCtaBarComponent,
    VehicleDetailModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
