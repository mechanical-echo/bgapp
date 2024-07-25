import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { weatherIcons } from '../../../constants';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  animations: [
    // Pressing animation (scale down and return)
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
  
  weather: any; //holds a response from api with weather data
  
  weatherIcons = weatherIcons;  //icons from a constants storage
  Math = Math;  //assigning Math class to access it in html

  isPressedState = 'unpressed'; //animation state
  
  // Get weather when component is initialized
  ngOnInit(): void {
    this.getWeather();
  }

  // Assign API response data to a variable
  getWeather(): void {
    
    // Send request to an API, parsing API key and location coordinates (Liepaja, Latvia)
    this.http.get('http://api.weatherapi.com/v1/current.json?key=ec2f9a25251c41158a973452241807&q=56.5385,21.0538')
    .subscribe({  // Success - assign response value to a variable  
        next: (res: any) => {
          this.weather = res;
          console.log(this.weather);
        },
        error: (err) => { // Failure - print error in the console
          console.error('Error fetching weather data:', err);
        }
      });
  }

  // Update weather and run animation when pressed
  onWeatherPress() {
    this.isPressedState = 'pressed';
    setTimeout(() => {
      this.isPressedState = 'unpressed';
      this.getWeather();
    }, 100);
  }
}
