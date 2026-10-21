import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  highlight: string;
}

@Component({
  selector: 'app-advantages-bar',
  imports: [],
  templateUrl: './advantages-bar.html',
  styleUrl: './advantages-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvantagesBarComponent {
  readonly advantages = signal<AdvantageItem[]>([
    {
      id: 'aprovacao',
      icon: '/icons/icon-approval.svg',
      title: 'APROVAÇÃO RÁPIDA',
      highlight: '(100% online)',
    },
    {
      id: 'parcelamento',
      icon: '/icons/icon-card.svg',
      title: 'PARCELAMENTO FACILITADO',
      highlight: '(Em até 18x no cartão)',
    },
    {
      id: 'garantia',
      icon: '/icons/icon-guarantee.svg',
      title: 'GARANTIA DE QUALIDADE',
      highlight: '(Todas revisadas)',
    },
  ]);
}
