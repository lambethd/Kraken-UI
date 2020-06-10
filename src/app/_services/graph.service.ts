import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Graph } from '@/_models/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private apiService: ApiService) { }

  graph: Graph;
  public getGraph(id: number) {
    if (this.graph) {
      return this.graph;
    }
    this.apiService.getGraph(id).subscribe((data) => {
      this.graph = data;
      return this.graph;
    });
  }
}
