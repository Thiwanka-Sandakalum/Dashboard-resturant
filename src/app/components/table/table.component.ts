import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  @Input()
  displayedColumns: string[] = [];
  @Input()
  dataSource!: MatTableDataSource<any>;

  @Output()
  total_orders = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add ! operator
  @ViewChild(MatSort) sort!: MatSort; // Add ! operator


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
