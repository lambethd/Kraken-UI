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

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  dataSource: MatTableDataSource<Item>;
  selection: SelectionModel<Item>;
  displayedColumns: string[] = ['select', 'icon', 'name', 'type', 'current', 'movement', 'members', 'id'];
  toggleValue = "";

  chart: CanvasJS.Chart;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private itemService: ItemService,
    private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.dataSource = new MatTableDataSource(await this.itemService.getItems());
    this.selection = new SelectionModel<Item>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter)
    };

    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Item price"
      },
      data: [],
      axisX: {
        type: 'time',
        distribution: 'series',
        time: {
          unit: 'day'
        },
        valueFormatString: "DD MM YYYY",
        viewportMinimum: new Date(2019, 1, 1),
        stripLines: [
          {
            value: new Date(2020, 3, 30),
            color: "red",
            label: "Arch Release",
            showOnTop: true
          }
        ]
      },
      axisY: {
        suffix: "gp"
      },
      toolTip: {
        shared: true
      }
    });
    this.chart.render();
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
    this.selection.clear();
    this.updateGraph();
  }

  /** Toggles Week/Month/Year/Quarter/All-Time */
  doToggleChange({ value }: MatButtonToggleChange) {
    var min = new Date();
    min.setDate(min.getDate() - 1);
    this.chart.axisX.viewportMinimum = min;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  toggleRow(row) {
    this.selection.toggle(row);
    this.updateGraph();
  }

  resetGraph() {
    this.chart.options.data = [];
    this.chart.render();
  }

  updateGraph() {
    this.resetGraph();
    for (let selectedItem of this.selection.selected) {
      this.apiService.getGraph(selectedItem.id).subscribe((graph) => {
        let dataPoints = [];
        let sorted = graph.daily.sort((g1, g2) => {
          return g1.key > g2.key ? 1 : g1.key < g2.key ? -1 : 0;
        });
        for (let daily of sorted) {
          dataPoints.push({ x: new Date(daily.key), y: daily.value });
        }
        let data = {
          type: "line",
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