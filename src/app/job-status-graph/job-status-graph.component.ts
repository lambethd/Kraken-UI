import { Job } from '@/_models/job';
import { JobDetail } from '@/_models/job-detail';
import { JobsService } from '@/_services/jobs.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-job-status-graph',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './job-status-graph.component.html',
  styleUrls: ['./job-status-graph.component.css']
})
export class JobStatusGraphComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  margin = 80;

  async ngOnInit(): Promise<void> {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var jobs = await this.jobsService.getJobStatus(new Date());
    console.log(jobs);
    var jobDetails = await this.jobsService.getJobDetail();
    console.log(jobDetails);
    var graph = this.createGraph(jobDetails, jobs);
    console.log(graph);
    graphviz('#graph').width(width - this.margin).height(height - this.margin).renderDot(graph);
  }

  createGraph(jobDetails: JobDetail[], jobs: Job[]){
    var graph = 'digraph {';
    jobDetails.forEach(jd => {
      var latestJob = jobs.filter(j=>j.jobType == jd.jobType).sort((a,b)=>b.finishTime.getTime() - a.finishTime.getTime()).pop();
      if(latestJob){graph += "\n" + jd.jobType + " [fillcolor = " + this.mapJobStatus(latestJob.status) + ", style=filled];";}
      jd.jobDependencies.forEach(dep => {
        graph += "\n" + dep.jobType + " -> " + jd.jobType + ";";
      });
    });
    graph += "}";

    return graph;
  }

  mapJobStatus(status: string): string{
    switch(status){
      case "Pending":
        return "gray50";
      case "Completed":
        return "chartreuse2";
      case "Started":
        return "darkslategray1";
      case "Blocked":
        return "darkorange3"
      case "Failed":
        return "red";
      case "Cancelled":
        return "firebrick";
      default:
        return "white";
    }
  }

}
