import { Component, Input } from '@angular/core';
import { colors } from '../../../constants';
@Component({
  selector: 'maxwell',
  standalone: true,
  imports: [],
  templateUrl: './maxwell.component.html',
  styleUrl: './maxwell.component.css'
})
export class MaxwellComponent {
  @Input() timeOfTheDay = 0;
  colors = colors;
}
