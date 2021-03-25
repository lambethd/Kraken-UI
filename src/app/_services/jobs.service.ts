import { Job } from '@/_models/job';
import { JobDetail } from '@/_models/job-detail';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private apiService: ApiService) { }

  public async getJobStatus(date: Date) : Promise<Job[]>{
    const response = await this.apiService.getJobStatus(date).toPromise();
    return response;
  }

  public async getJobDetail() : Promise<JobDetail[]>{
    const response = await this.apiService.getJobDetail().toPromise();
    return response;
  }
}
