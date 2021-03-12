import { Dashboard } from '@/_models/dashboard';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService, private alertService : AlertService) { }

  public getTodaysDashboard() : Promise<Dashboard> {
    return this.apiService.getDashboard().toPromise();
  }  
}
