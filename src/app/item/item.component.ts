import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { ApiService } from '../_services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as CanvasJS from '../../assets/canvasjs.min';
import { Item } from '@/_models/item';
import { ItemService } from '@/_services/item.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { EventService } from '@/_services/event.service';
import { Observable, forkJoin } from 'rxjs';
import { Graph } from '@/_models/graph';
import { EventDto } from '@/_models/event';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  dataSource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;
  displayedColumns: string[] = ['select', 'icon', 'name', 'type', 'current', 'movement', 'members', 'id'];
  toggleValue = "WEEK";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private itemService: ItemService,
    private apiService: ApiService,
    private eventService: EventService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource(await this.itemService.getItems());
    this.selection = new SelectionModel<Item>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.type.toLowerCase().includes(filter)
    };
  };

  applyFilter(event: Event) {
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
    this.multi = [];
    this.selection.clear();
  }

  /** Toggles Week/Month/Year/Quarter/All-Time */
  doToggleChange({ value }: MatButtonToggleChange) {
    this.toggleValue = value;
    this.buildChart();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  toggleRow(row: Item) {
    this.selection.toggle(row);
    this.buildChart();
  }

  buildChart() {
    forkJoin(
      this.apiService.getGraphs(this.selection.selected.map(i => i.id), this.toggleValue),
      this.apiService.getEvents(this.toggleValue)
    )
      .subscribe(data => {
        var thing = data[0];
        this.multi = [];
        for (let graph of thing) {
          let multiDataPoints = [];
          let sorted = graph.daily.sort((g1, g2) => {
            return g1.key > g2.key ? 1 : g1.key < g2.key ? -1 : 0;
          });
          for (let daily of sorted) {
            multiDataPoints.push({name: new Date(daily.key), value: daily.value});
          }
          let multiLineData = {
            name: this.selection.selected.filter(s=>s.id == graph.id).pop().name,
            series: multiDataPoints
          };
          this.multi.push(multiLineData);
        }
      });
  };

  
public multi = [];


  view: any[] = [1200, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
}
