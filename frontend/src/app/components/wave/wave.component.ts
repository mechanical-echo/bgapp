import { Component, Input } from '@angular/core';
import { colors } from '../../../constants';

@Component({
  selector: 'wave',
  standalone: true,
  imports: [],
  templateUrl: './wave.component.html',
  styleUrl: './wave.component.css'
})
export class WaveComponent {
  @Input() timeOfTheDay = 0;
  colors = colors;
}
