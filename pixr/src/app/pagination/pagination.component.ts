import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  private limit: number = 8;
  private currentPage: number = 1;
  private pages: Array<any> = [];

  @Output() paginationChanged = new EventEmitter();

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
  }

  setPageCount(pages: number) {
    this.pages = new Array(pages);
  }

  change(clicked: number) {
    this.currentPage = clicked;
    this.paginationChanged.emit({'page': this.currentPage, 'limit': this.limit})
  }
}
