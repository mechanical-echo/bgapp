import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:4564/api/songs';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}