import { trigger, state, style, animate, transition } from '@angular/animations';
import { titleArr, subtitleArr, colors, weatherIcons } from '../constants';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PlaylistComponent } from './components/playlist/playlist.component';
import { WaveComponent } from './components/wave/wave.component';
import { TimeComponent } from './components/time/time.component';
import { MaxwellComponent } from './components/maxwell/maxwell.component';
import { WeatherComponent } from './components/weather/weather.component';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PlaylistComponent, WaveComponent, TimeComponent, MaxwellComponent, WeatherComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('textChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('300ms cubic-bezier(.4,-0.33,.05,1.6)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('buttonHover', [
      state('out', 
        style({ transform: 'translateX(8rem)' })
      ),
      state('in', 
        style({ transform: 'translateX(0)' })
      ),
      transition('out <=> in', [
        animate('300ms cubic-bezier(.4,-0.33,.05,1.6)')
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  Math = Math;  
  constructor (private http: HttpClient) {}

  private themeInterval: any;
  
  ngOnInit(): void {
    
    this.setTimeOfDayBasedOnRealTime();

    this.themeInterval = setInterval(() => {
      this.setTimeOfDayBasedOnRealTime();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.themeInterval) {
      clearInterval(this.themeInterval);
    }
  }

  titleArr = titleArr;
  subtitleArr = subtitleArr;
  colors = colors;
  weatherIcons = weatherIcons;
  timeOfTheDay = 0;
  animState = 'out'
  showSeconds = false;
  showThemeButtons = false;

  changeTime(x: number) {
    this.timeOfTheDay = x;
    
    const themeRadios = document.getElementsByName('theme-radios') as NodeListOf<HTMLInputElement>;
    
    if (themeRadios[x]) {
      themeRadios[x].checked = true;
    }
    
    const theme = ['morningTheme', 'dayTheme', 'nightTheme'][x];
    document.documentElement.setAttribute('data-theme', theme);
  }

  

  setTimeOfDayBasedOnRealTime(): void {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      this.changeTime(0); // Morning
    } else if (currentHour >= 12 && currentHour < 18) {
      this.changeTime(1); // Day
    } else {
      this.changeTime(2); // Night
    }
  }

  onEnter(){
    this.animState = 'in'
  }

  onLeave(){
    this.animState = 'out'
  }
}
