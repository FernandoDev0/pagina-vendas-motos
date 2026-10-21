import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'MOTO FORCE | O Maior Estoque de Motos Seminovas e Zero KM',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
