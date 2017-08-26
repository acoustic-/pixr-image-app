import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { LargePhotoViewerComponent } from '../large-photo-viewer/large-photo-viewer.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {


  @ViewChild('pagination') pagination: PaginationComponent;
  @ViewChild('largePhoto') largePhoto: LargePhotoViewerComponent;

  public photos: Array<object> = [];
  private allPhotos: Array<object> = [];
  private currentAlbum: string = "";
  public currentAlbumName: string = "";
  private currentPage: number = this.pagination.getCurrentPage();
  private limit: number = this.pagination.getLimit();

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
    // this.resources.getAlbums().subscribe(res => {
    //   if (res && res.length) {
    //     this.onAlbumChanged(res[0]);
    //   }
    // })
  }

  public onPaginationChanged(pagination: object) {
    this.currentPage = pagination['page'];
    this.limit = pagination['limit'];
    this.updatePhotos();    
  }

  public onPhotoSelected(photo: any) {
    let index = _.findIndex(this.allPhotos, (p) => {return p['id'] === photo['id']})
    let previousIndex = index - 1 >= 0 ? index - 1 : -1;
    let nextIndex = index + 1 > 0 && index + 1 < this.allPhotos.length ? index + 1 : -1;
    this.largePhoto.setPhoto(
      photo, 
      previousIndex > -1 ? this.allPhotos[previousIndex] : null,
      nextIndex > -1 ? this.allPhotos[nextIndex] : null);
    // Update pagination
    let page = Math.ceil((index+1)/this.limit);
    if (this.currentPage !== page) {
      this.pagination.setPagination({page: page, limit: this.limit});
    }
  }

  private updatePhotos() {
    this.resources.getSubsetOfPhotosInAlbum(
      this.currentAlbum, 
      this.currentPage, 
      this.limit).subscribe(res => {
      this.photos = res;
    })
  }

  public onAlbumChanged(album: object) {
    this.currentAlbum = album['id'];
    this.currentAlbumName = album['title'];
    this.updatePhotos();

    this.resources.getPhotosInAlbum(this.currentAlbum).subscribe(res => {
      this.allPhotos = res;
      this.pagination.setTotalCount(res.length);
    })
  }
}
