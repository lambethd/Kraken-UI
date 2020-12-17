import { Component, OnInit, Input } from '@angular/core';
import { Index } from '@/_models';

@Component({
  selector: 'app-indexes-widget',
  templateUrl: './indexes-widget.component.html',
  styleUrls: ['./indexes-widget.component.css']
})
export class IndexesWidgetComponent implements OnInit {

  @Input()
  indexs: Index[];

  constructor() { }

  ngOnInit(): void {
  }

}
