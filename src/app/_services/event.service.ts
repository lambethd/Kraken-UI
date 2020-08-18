import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService: ApiService) { }

  public getEvents(range: string) {
    this.apiService.getEvents(range).subscribe((data) => {
      return data;
    });
  }
}
