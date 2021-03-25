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
    var graph = this.createGraph(jobDetails);
    console.log(graph);
    graphviz('#graph').width(width - this.margin).height(height - this.margin).renderDot(graph);
  }

  createGraph(jobDetails: JobDetail[]){
    var graph = 'digraph {';
    jobDetails.forEach(jd => {
      jd.jobDependencies.forEach(dep => {
        graph += "\n" + dep.jobType + " -> " + jd.jobType + ";";
      });
    });
    graph += "}";

    return graph;
  }

}
