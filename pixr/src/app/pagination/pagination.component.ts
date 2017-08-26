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
  private photo: object;
  private thumbnail: string = "";

  ngOnInit() {
  }

  setTotalCount(total: number) {
    this.pages = new Array(Math.ceil(total /this.limit));
    this.currentPage = 1;
  }

  change(clicked: number) {
    console.log("clicked", clicked)
    this.currentPage = clicked;
    this.paginationChanged.emit({'page': this.currentPage, 'limit': this.limit});
  }

  public setPagination(pagination: {page: number, limit: number}) {
    console.log("update with ", pagination)
    this.limit = pagination.limit;
    this.currentPage = pagination.page;
    this.change(this.currentPage);
  }
}
