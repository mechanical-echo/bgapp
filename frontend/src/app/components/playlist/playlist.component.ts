import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SongService } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css',
  animations: [
    trigger('pressPlay', [
      state('unpressed', style({
        transform: 'rotate(0deg)'
      })),
      state('pressed', style({
        transform: 'rotate(-90deg)'
      })),
      transition('unpressed <=> pressed', [
        animate('500ms cubic-bezier(.73,-0.65,.06,1.94)')
      ])
    ]),
    trigger('pressNext', [
      state('unpressed', style({
        transform: 'rotate(0deg)'
      })),
      state('pressed', style({
        transform: 'rotate(-90deg)'
      })),
      transition('unpressed <=> pressed', [
        animate('500ms cubic-bezier(.73,-0.65,.06,1.94)')
      ])
    ]),
    trigger('pressBack', [
      state('unpressed', style({
        transform: 'rotate(0deg)'
      })),
      state('pressed', style({
        transform: 'rotate(90deg)'
      })),
      transition('unpressed <=> pressed', [
        animate('500ms cubic-bezier(.73,-0.65,.06,1.94)')
      ])
    ])
  ]
})
export class PlaylistComponent implements OnInit {
  @Input() timeOfTheDay = 0;
  @Output() changedTime = new EventEmitter<number>();
  @ViewChild('ap') audio!: ElementRef;
  
  
  constructor (private songService: SongService, private _elementRef : ElementRef) {};

  isPlayPressed = 'unpressed';
  isNextPressed = 'unpressed';
  isBackPressed = 'unpressed';
  
  songs: any[] = [];
  isPlaying = false;
  
  ssSliderPoint = 0;
  ssDuration = 0;
  ss?: any;

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      songs => this.songs = songs,
      error => console.error('Error fetching songs:', error)
    );
  }

  ngAfterViewInit() {
    if (this.audio) {
      const audio = this.audio.nativeElement;
      audio.addEventListener('timeupdate', this.updateSlider.bind(this));
      audio.addEventListener('loadedmetadata', this.updateSlider.bind(this));
    }
  }

  changeTime(x: number) {
    this.timeOfTheDay = x;
    
    const themeRadios = document.getElementsByName('theme-radios') as NodeListOf<HTMLInputElement>;
    
    if (themeRadios[x]) {
      themeRadios[x].checked = true;
    }
    
    const theme = ['morningTheme', 'dayTheme', 'nightTheme'][x];
    document.documentElement.setAttribute('data-theme', theme);

    this.changedTime.emit(x);
  }

  selectSong(index: number){
    const song = this.songs[index]

    this.deselectAll()
    song.selected = true

    setTimeout(() => {
      this.ss = song;
      this.audio.nativeElement.load()
      this.audio.nativeElement.play()
      this.updateBool()
    }, 1); 
  }

  deselectAll(){
    this.songs.forEach(song => song.selected = false);
    this.ss = null
  }

  updateSlider() {
    if (this.audio) {
      const audio = this.audio.nativeElement;
      this.ssSliderPoint = audio.currentTime;
    }
  }

  seekAudio(event: any) {
    if (this.audio) {
      const audio = this.audio.nativeElement;
      audio.currentTime = event.target.value;
    }
  }
  
  play() {
    if(this.ss == undefined){
      this.selectSong(0)
    }else{
      if (this.audio) {
        this.audio.nativeElement.paused ? this.audio.nativeElement.play() : this.audio.nativeElement.pause();
        this.updateBool()
      }
    }
    this.isPlayPressed = 'pressed';
    setTimeout(() => {
      this.isPlayPressed = 'unpressed';
    }, 100);
  }
  
  next(){
    if(this.songs.indexOf(this.ss)+1 == this.songs.length){
      this.selectSong(0)
    }else{
      this.selectSong(this.songs.indexOf(this.ss) + 1)
    }
    this.isNextPressed = 'pressed';
    setTimeout(() => {
      this.isNextPressed = 'unpressed';
    }, 100);
  }
  
  prev(){
    if(this.songs.indexOf(this.ss)-1 == -1){
      this.selectSong(this.songs.length-1)
    }else{
      this.selectSong(this.songs.indexOf(this.ss) - 1)
    }
    this.isBackPressed = 'pressed';
    setTimeout(() => {
      this.isBackPressed = 'unpressed';
    }, 100);
  }
  
  updateBool(){
    this.isPlaying = !this.audio.nativeElement.paused
  }

}
