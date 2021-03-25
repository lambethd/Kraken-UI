import { Component, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-job-status-graph',
  templateUrl: './job-status-graph.component.html',
  styleUrls: ['./job-status-graph.component.css']
})
export class JobStatusGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    graphviz('#graph', {useWorker:false, tweenPaths:false, tweenShapes:false})
    .renderDot('digraph { a->b }');
  }

}
