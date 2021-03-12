import { Dashboard } from '@/_models/dashboard';
import { DashboardService } from '@/_services/dashboard.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService : DashboardService) { }
  public dashboard : Dashboard;
  ngOnInit() {
    this.dashboardService.getTodaysDashboard().then(data=>{
      this.dashboard = data;
    });
  }
}
