import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  animations: [
    trigger('buttonHover', [
      state('out', 
        style({ transform: 'translateX(8rem)' })
      ),
      state('in', 
        style({ transform: 'translateX(0)' }) ),
      transition('out <=> in', [
        animate('300ms cubic-bezier(.4,-0.33,.05,1.6)')
      ])
    ])
  ]
})
export class SettingsComponent implements OnInit {
  @Output() changeSeconds = new EventEmitter<boolean>();
  @Output() changeThemeButtons = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.showSeconds = localStorage.getItem('showSeconds') === 'true' ? true : false;
    this.showThemeButtons = localStorage.getItem('showThemeButtons') === 'true' ? true : false;
    
    this.setTimeOfDayBasedOnRealTime();
    
    this.themeInterval = setInterval(() => {
      this.setTimeOfDayBasedOnRealTime();
    }, 60000);

    this.secondsInterval = setInterval(() => {
      if(this.sec == 0){
        this.sec = 60
      }else{
        this.sec--;
      }
    }, 1000)
  }

  themeInterval: any;
  secondsInterval: any;
  sec = 60;

  showSeconds = false;
  showThemeButtons = false;
  animState = 'out'

  onEnter(){
    this.animState = 'in'
  }

  onLeave(){
    this.animState = 'out'
  }

  changeTime(x: number) {
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
}
