import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { LargePhotoViewerComponent } from '../large-photo-viewer/large-photo-viewer.component';
import { UserViewerComponent } from '../user-viewer/user-viewer.component';
import { UsersService } from '../users.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {


  @ViewChild('pagination') pagination: PaginationComponent;
  @ViewChild('largePhoto') largePhoto: LargePhotoViewerComponent;
  @ViewChild(UserViewerComponent) userViewer: UserViewerComponent;

  public photos: Array<object> = [];
  private allPhotos: Array<object> = [];
  private currentAlbum: string = "";
  public currentAlbumName: string = "";
  private currentPage: number = 1;
  private limit: number = 8;

  constructor(private resources: ResourcesService, private users: UsersService) { }

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
    this.userViewer.hide();
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

  public onUserSelected(user: any) {
    this.userViewer.setUser(user);
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
