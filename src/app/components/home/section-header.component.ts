import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <h2 class="text-3xl font-bold mb-8">{{ title }}</h2>
  `
})
export class SectionHeaderComponent {
  @Input() title!: string;
}