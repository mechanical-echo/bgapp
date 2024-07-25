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
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SongService } from './services/songs.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PlaylistComponent, WaveComponent, TimeComponent, MaxwellComponent, WeatherComponent, FormsModule, SettingsComponent],
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
  constructor (private songService: SongService, private http: HttpClient) {}

  ngOnInit(): void {
    this.showSeconds = localStorage.getItem('showSeconds') === 'true' ? true : false;

    this.showThemeButtons = localStorage.getItem('showThemeButtons') === 'true' ? true : false;
    
    forkJoin({
      morning: this.songService.getSongs('morning'),
      day: this.songService.getSongs('day'),
      night: this.songService.getSongs('night')
    }).subscribe({
      next: (result) => {
        this.morningPlaylist = result.morning;
        this.dayPlaylist = result.day;
        this.nightPlaylist = result.night;
  
        this.allPlaylists = [this.morningPlaylist, this.dayPlaylist, this.nightPlaylist];
        this.songs = this.allPlaylists[this.timeOfTheDay];
      },
      error: (error) => console.error('Error fetching songs:', error)
    });
  }

  titleArr = titleArr;
  subtitleArr = subtitleArr;
  colors = colors;
  weatherIcons = weatherIcons;
  timeOfTheDay = 0;
  animState = 'out'

  allPlaylists: any[] = [];
  morningPlaylist: any[] = [];
  dayPlaylist: any[] = [];
  nightPlaylist: any[] = [];
  songs: any[] = [];

  // Settings
  showSeconds = false;
  showThemeButtons = false;

  changeTime(x: number) {
    this.timeOfTheDay = x;
    
    const themeRadios = document.getElementsByName('theme-radios') as NodeListOf<HTMLInputElement>;
    
    if (themeRadios[x]) {
      themeRadios[x].checked = true;
    }

    this.allPlaylists = [this.morningPlaylist, this.dayPlaylist, this.nightPlaylist]
    this.songs = this.allPlaylists[x];
    
    const theme = ['morningTheme', 'dayTheme', 'nightTheme'][x];
    document.documentElement.setAttribute('data-theme', theme);
  }

  setSeconds(b: boolean){
    this.showSeconds = b;
    localStorage.setItem('showSeconds', b.toString())
  }

  setThemeButtons(b: boolean){
    this.showThemeButtons = b;
    localStorage.setItem('showThemeButtons', b.toString())
  }

  updateSongs(){
    forkJoin({
      morning: this.songService.getSongs('morning'),
      day: this.songService.getSongs('day'),
      night: this.songService.getSongs('night')
    }).subscribe({
      next: (result) => {
        this.morningPlaylist = result.morning;
        this.dayPlaylist = result.day;
        this.nightPlaylist = result.night;
  
        this.allPlaylists = [this.morningPlaylist, this.dayPlaylist, this.nightPlaylist];
        this.songs = this.allPlaylists[this.timeOfTheDay];
      },
      error: (error) => console.error('Error fetching songs:', error)
    });
  }
}
