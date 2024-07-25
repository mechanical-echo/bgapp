import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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
  @Output() changeTheme = new EventEmitter<number>();
  @Output() updateSongs = new EventEmitter<any>();

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.showSeconds = localStorage.getItem('showSeconds') === 'true' ? true : false;
    this.showThemeButtons = localStorage.getItem('showThemeButtons') === 'true' ? true : false;
    this.changeThemeByTime = localStorage.getItem('changeThemeByTime') === 'true' ? true : false;

    this.setTimeOfDayBasedOnRealTime();
    
    this.themeInterval = setInterval(() => {
      if(this.changeThemeByTime){
        this.setTimeOfDayBasedOnRealTime();
      }
    }, 60000);

    this.secondsInterval = setInterval(() => {
      if(this.sec == 0){
        this.sec = 60
      }else{
        this.sec--;
      }
    }, 1000)
  }

  selectedFile: File | null = null;
  themeInterval: any;
  secondsInterval: any;
  sec = 60;

  showSeconds = false;
  showThemeButtons = false;
  changeThemeByTime = false;

  animState = 'out'

  onEnter(){
    this.animState = 'in'
  }

  onLeave(){
    this.animState = 'out'
  }

  onThemeSettingToggle() {
    localStorage.setItem('changeThemeByTime', this.changeThemeByTime.toString());
  }

  setTimeOfDayBasedOnRealTime(): void {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      this.changeTheme.emit(0); // Morning
    } else if (currentHour >= 12 && currentHour < 18) {
      this.changeTheme.emit(1); // Day
    } else {
      this.changeTheme.emit(2); // Night
    }
  }

  radioTime = 'morning';

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('playlist', this.radioTime)

      this.http.post('http://localhost:4564/api/upload', formData).subscribe(
        response => this.updateSongs.emit(),
        error => console.error('Upload failed', error)
      );
    }
  }

}
