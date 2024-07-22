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

interface WeatherResponse {
  location: Location;
  current: Current;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Current {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  humidity: number;
  last_updated: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PlaylistComponent, WaveComponent, TimeComponent, MaxwellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('textChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('300ms cubic-bezier(.4,-0.33,.05,1.6)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pressAnimation', [
      state('unpressed', style({
        transform: 'scale(1)'
      })),
      state('pressed', style({
        transform: 'scale(0.95)'
      })),
      transition('unpressed <=> pressed', [
        animate('100ms ease-in-out')
      ])
    ]),
    
  ]
})
export class AppComponent implements OnInit {

  Math = Math;  
  constructor (private http: HttpClient) {}

  private themeInterval: any;
  
  ngOnInit(): void {
    this.getWeather();
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
  

  weather?: WeatherResponse;
  
  changeTime(x: number) {
    this.timeOfTheDay = x;
    
    const themeRadios = document.getElementsByName('theme-radios') as NodeListOf<HTMLInputElement>;
    
    if (themeRadios[x]) {
      themeRadios[x].checked = true;
    }
    
    const theme = ['morningTheme', 'dayTheme', 'nightTheme'][x];
    document.documentElement.setAttribute('data-theme', theme);
  }

  getWeather(): void {
    this.http.get<WeatherResponse>('http://api.weatherapi.com/v1/current.json?key=ec2f9a25251c41158a973452241807&q=56.5385,21.0538')
      .subscribe({
        next: (res: WeatherResponse) => {
          this.weather = res;
          console.log(res);
        },
        error: (err) => {
          console.error('Error fetching weather data:', err);
        }
      });
  }

  isPressedState = 'unpressed';

  onWeatherPress() {
    this.isPressedState = 'pressed';
    setTimeout(() => {
      this.isPressedState = 'unpressed';
      this.getWeather();
    }, 100);
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
}
