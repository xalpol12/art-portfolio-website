import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: `apw-break`, template: `
    <div class="break" [ngClass]="'break--' + size"></div>
  `,
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrl: 'break.component.scss'
})
export class BreakComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
