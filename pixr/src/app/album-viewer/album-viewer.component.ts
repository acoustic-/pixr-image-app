import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResourcesService } from '../resources.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { LargePhotoViewerComponent } from '../large-photo-viewer/large-photo-viewer.component';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {


  @ViewChild('pagination') pagination: PaginationComponent;
  @ViewChild('largePhoto') largePhoto: LargePhotoViewerComponent;

  private photos: Array<object> = [];
  private currentAlbum: string = "";
  private currentAlbumName: string = "";
  private currentPage: number = 1;
  private limit: number = 8;

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
    this.resources.getAlbums().subscribe(res => {
      if (res && res.length) {
        this.onAlbumChanged(res[0])
      }
    })
  }

  private onPaginationChanged(pagination: object) {
    this.currentPage = pagination['page'];
    this.limit = pagination['limit'];
    this.updatePhotos();    
  }

  private onPhotoSelected(photo: any) {
    console.log("onPhotoSelected", photo)
    this.largePhoto.setPhoto(photo);
  }

  private updatePhotos() {
    console.log("update photos called")
    this.resources.getSubsetOfPhotosInAlbum(
      this.currentAlbum, 
      this.currentPage, 
      this.limit).subscribe(res => {
      this.photos = res;
      console.log("loaded update photos", res)
    })
  }

  private onAlbumChanged(album: object) {
    console.log("album changed", album)
    this.currentAlbum = album['id'];
    this.currentAlbumName = album['title'];
    this.updatePhotos();

    this.resources.getPhotosInAlbum(this.currentAlbum).subscribe(res => {
      this.pagination.setTotalCount(res.length);
    })
  }
}
