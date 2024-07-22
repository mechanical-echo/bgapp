import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'display-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent implements OnInit {
  @Input() showSeconds = false;
  private interval: any;

  ngOnInit(): void {
    this.getCurrentTime();

    this.interval = setInterval(() => {
      this.getCurrentTime();
    }, 1000)
  }
  ngOnDestroy(): void{
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  Math = Math;
  time?: string;
  
  getCurrentTime(){
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();

    let hString = '';
    let mString = '';
    let sString = '';

    if(this.Math.floor(h/10) == 0){
      hString = '0';
    }
    if(this.Math.floor(m/10) == 0){
      mString = '0';
    }
    if(this.Math.floor(s/10) == 0){
      sString = '0';
    }

    hString += h;
    mString += m;
    sString += s;

    if(this.showSeconds){
      this.time = `${hString}:${mString}:${sString}`;
    }else{
      this.time = `${hString}:${mString}`;
    }
  }
}
