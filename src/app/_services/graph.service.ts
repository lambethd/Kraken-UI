import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Graph } from '@/_models/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private apiService: ApiService) { }

  graph: Graph;
  public getGraph(id: number, range: string) {
    if (this.graph.id == id) {
      return this.graph;
    }
    this.apiService.getGraph(id, range).subscribe((data) => {
      this.graph = data;
      return this.graph;
    });
  }
}
