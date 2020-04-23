import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {ApiService, Item, Graph} from '../api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import * as CanvasJS from '../../assets/canvasjs.min';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  dataSource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;
  displayedColumns: string[] = ['select', 'icon', 'name', 'type', 'current', 'movement', 'members', 'id'];

  chart: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getItems().subscribe((data)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.selection = new SelectionModel<Item>(true, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Item price"
      },
      data: [{type:"spline"}]
    });
    this.chart.render();
  };

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Clears collection */
  clearAll() {
    this.selection.clear();
    this.updateGraph();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  toggleRow(row){
    this.selection.toggle(row);
    this.updateGraph();
  }

  resetGraph(){
    this.chart.options.data = [{type:"spline"}];
    this.chart.render();
  }

  updateGraph(){
    this.resetGraph();
    
    for(let selectedItem of this.selection.selected){
      this.apiService.getGraph(selectedItem.id).subscribe((graph)=>{
        let dataPoints = [];
        for(let daily of graph.daily){
          dataPoints.push({label:daily.key.substr(0, 10), y: daily.value});
        }
        dataPoints = dataPoints.sort((g1, g2) => {
          return g1.label > g2.label ? 1 : g1.label < g2.label ? -1 : 0;
        });
        let data = {
          type: "spline",
          name: selectedItem.name,
          showInLegend: true,
          dataPoints: dataPoints          
        };
        this.chart.options.data.push(data);
        this.chart.render();
      });
    };
  }
}