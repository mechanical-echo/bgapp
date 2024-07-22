import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { weatherIcons } from '../../../constants';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  animations: [
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
export class WeatherComponent implements OnInit{
  
  constructor(private http: HttpClient){}
  
  weather: any;
  
  weatherIcons = weatherIcons;
  Math = Math;

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.http.get('http://api.weatherapi.com/v1/current.json?key=ec2f9a25251c41158a973452241807&q=56.5385,21.0538')
      .subscribe({
        next: (res: any) => {
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
}
