import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

interface Testimonial {
  id: string;
  name: string;
  bike: string;
  avatar: string;
  rating: number;
  comment: string;
  city: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  readonly testimonials = signal<Testimonial[]>([
    {
      id: 'romalice',
      name: 'Romalice de Oliveira',
      bike: 'Honda CB 500X',
      avatar: '/images/testimonial-customer-1.jpg',
      rating: 5,
      comment:
        'Atendimento impecável do início ao fim! Fiz a simulação pelo site e em menos de 15 minutos recebi o contato com a proposta aprovada. A moto veio impecável, com laudo aprovado e 1 ano de garantia.',
      city: 'São Paulo - SP',
    },
    {
      id: 'luiza-carlos',
      name: 'Luiza e Carlos Ria',
      bike: 'BMW G 310 GS',
      avatar: '/images/testimonial-customer-2.jpg',
      rating: 5,
      comment:
        'A transparência da equipe Moto Force é fantástica. Mostraram todo o histórico da moto e parcelaram a entrada no cartão em 12x. Retiramos a moto no mesmo dia com tanque cheio. Experiência nota 10!',
      city: 'Santo André - SP',
    },
  ]);
}
